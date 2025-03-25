import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import {
  insertBookingSchema,
  insertVehicleSchema,
  insertLocationSchema,
  insertParkingSpotSchema,
  insertActivitySchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Get all locations
  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await storage.getAllLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  // Get specific location
  app.get("/api/locations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const location = await storage.getLocation(id);
      
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location" });
    }
  });

  // Get parking spots by location
  app.get("/api/locations/:id/spots", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      const spots = await storage.getParkingSpotsByLocation(locationId);
      res.json(spots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch parking spots" });
    }
  });

  // Get vehicles for authenticated user
  app.get("/api/vehicles", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const vehicles = await storage.getVehiclesByUserId(req.user.id);
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  // Create a new vehicle
  app.post("/api/vehicles", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const validatedData = insertVehicleSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const vehicle = await storage.createVehicle(validatedData);
      
      // Log the activity
      await storage.createActivity({
        userId: req.user.id,
        type: "vehicle_created",
        description: `Vehicle ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate}) added`,
        timestamp: new Date(),
        relatedId: vehicle.id,
        metadata: null
      });
      
      res.status(201).json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vehicle data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vehicle" });
    }
  });

  // Get bookings for authenticated user
  app.get("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const bookings = await storage.getBookingsByUserId(req.user.id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Create a new booking
  app.post("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const validatedData = insertBookingSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      // Check if the spot is available
      const spot = await storage.getParkingSpot(validatedData.spotId);
      if (!spot || spot.status !== "available") {
        return res.status(400).json({ message: "Parking spot is not available" });
      }
      
      const booking = await storage.createBooking(validatedData);
      
      // Log the activity
      await storage.createActivity({
        userId: req.user.id,
        type: "booking_created",
        description: "New reservation made",
        timestamp: new Date(),
        relatedId: booking.id,
        metadata: JSON.stringify({
          spotId: booking.spotId,
          startTime: booking.startTime,
          endTime: booking.endTime
        })
      });
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Update booking status
  app.patch("/api/bookings/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      // Validate status
      if (!["active", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      // Check if booking exists and belongs to user
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      if (booking.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized to update this booking" });
      }
      
      const updatedBooking = await storage.updateBookingStatus(id, status);
      
      // Log the activity
      await storage.createActivity({
        userId: req.user.id,
        type: "booking_updated",
        description: `Booking status changed to ${status}`,
        timestamp: new Date(),
        relatedId: id,
        metadata: null
      });
      
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking" });
    }
  });

  // Get recent activities (limited access depending on user role)
  app.get("/api/activities", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      // For regular users, only return their activities
      // For admins, return all activities
      const limit = parseInt(req.query.limit as string) || 10;
      const activities = await storage.getRecentActivities(limit);
      
      if (req.user.role === "admin") {
        return res.json(activities);
      }
      
      // Filter activities for regular users
      const userActivities = activities.filter(activity => 
        activity.userId === req.user.id || activity.userId === null
      );
      
      res.json(userActivities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Update parking spot status (admin or system only)
  app.patch("/api/spots/:id", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      // Validate status
      if (!["available", "occupied", "reserved", "maintenance"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedSpot = await storage.updateParkingSpotStatus(id, status);
      
      if (!updatedSpot) {
        return res.status(404).json({ message: "Parking spot not found" });
      }
      
      // Log the activity
      await storage.createActivity({
        userId: req.user.id,
        type: "spot_updated",
        description: `Spot ${updatedSpot.spotNumber} status changed to ${status}`,
        timestamp: new Date(),
        relatedId: id,
        metadata: null
      });
      
      res.json(updatedSpot);
    } catch (error) {
      res.status(500).json({ message: "Failed to update parking spot" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
