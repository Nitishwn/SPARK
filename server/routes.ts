import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertVehicleSchema, insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // API routes
  // User vehicles
  app.get("/api/vehicles", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    const vehicles = await storage.getVehiclesByUserId(req.user.id);
    res.json(vehicles);
  });
  
  app.post("/api/vehicles", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const vehicleData = insertVehicleSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const vehicle = await storage.createVehicle(vehicleData);
      res.status(201).json(vehicle);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "Failed to create vehicle" });
      }
    }
  });

  // Parking facilities
  app.get("/api/facilities", async (req, res) => {
    const facilities = await storage.getAllFacilities();
    res.json(facilities);
  });
  
  app.get("/api/facilities/:id", async (req, res) => {
    const facilityId = parseInt(req.params.id);
    const facility = await storage.getFacility(facilityId);
    
    if (!facility) {
      return res.status(404).json({ error: "Facility not found" });
    }
    
    res.json(facility);
  });

  // Parking spots
  app.get("/api/facilities/:id/spots", async (req, res) => {
    const facilityId = parseInt(req.params.id);
    const spots = await storage.getSpotsByFacility(facilityId);
    res.json(spots);
  });
  
  app.get("/api/facilities/:id/available", async (req, res) => {
    const facilityId = parseInt(req.params.id);
    const availableSpots = await storage.getAvailableSpots(facilityId);
    res.json(availableSpots);
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    try {
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId: req.user.id,
        status: 'active'
      });
      
      // Check if spot is available
      const spot = await storage.getSpot(bookingData.spotId);
      if (!spot || spot.status !== 'available') {
        return res.status(400).json({ error: "Spot is not available" });
      }
      
      // Check if vehicle belongs to user
      const vehicle = await storage.getVehicle(bookingData.vehicleId);
      if (!vehicle || vehicle.userId !== req.user.id) {
        return res.status(403).json({ error: "Vehicle does not belong to user" });
      }
      
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });
  
  app.get("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    const bookings = await storage.getBookingsByUser(req.user.id);
    res.json(bookings);
  });
  
  app.get("/api/bookings/active", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    
    const activeBookings = await storage.getActiveBookingsByUser(req.user.id);
    res.json(activeBookings);
  });
  
  // Admin only endpoints
  app.get("/api/admin/bookings/recent", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).send("Unauthorized");
    }
    
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const recentBookings = await storage.getRecentBookings(limit);
    res.json(recentBookings);
  });
  
  app.put("/api/admin/spots/:id/status", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).send("Unauthorized");
    }
    
    const spotId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status || !['available', 'occupied', 'reserved', 'maintenance'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    
    const updatedSpot = await storage.updateSpotStatus(spotId, status);
    
    if (!updatedSpot) {
      return res.status(404).json({ error: "Spot not found" });
    }
    
    res.json(updatedSpot);
  });

  const httpServer = createServer(app);
  return httpServer;
}
