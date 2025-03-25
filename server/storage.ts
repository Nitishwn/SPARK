import { 
  users, type User, type InsertUser,
  vehicles, type Vehicle, type InsertVehicle,
  parkingSpots, type ParkingSpot, type InsertParkingSpot,
  locations, type Location, type InsertLocation,
  bookings, type Booking, type InsertBooking,
  activities, type Activity, type InsertActivity
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vehicle methods
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getVehiclesByUserId(userId: number): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  
  // Location methods
  getLocation(id: number): Promise<Location | undefined>;
  getAllLocations(): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Parking spot methods
  getParkingSpot(id: number): Promise<ParkingSpot | undefined>;
  getParkingSpotsByLocation(locationId: number): Promise<ParkingSpot[]>;
  updateParkingSpotStatus(id: number, status: string): Promise<ParkingSpot | undefined>;
  createParkingSpot(spot: InsertParkingSpot): Promise<ParkingSpot>;
  
  // Booking methods
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Activity methods
  getRecentActivities(limit: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vehicles: Map<number, Vehicle>;
  private locations: Map<number, Location>;
  private parkingSpots: Map<number, ParkingSpot>;
  private bookings: Map<number, Booking>;
  private activities: Map<number, Activity>;
  
  private userIdCounter: number;
  private vehicleIdCounter: number;
  private locationIdCounter: number;
  private parkingSpotIdCounter: number;
  private bookingIdCounter: number;
  private activityIdCounter: number;
  
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.locations = new Map();
    this.parkingSpots = new Map();
    this.bookings = new Map();
    this.activities = new Map();
    
    this.userIdCounter = 1;
    this.vehicleIdCounter = 1;
    this.locationIdCounter = 1;
    this.parkingSpotIdCounter = 1;
    this.bookingIdCounter = 1;
    this.activityIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Vehicle methods
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }
  
  async getVehiclesByUserId(userId: number): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.userId === userId
    );
  }
  
  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.vehicleIdCounter++;
    const vehicle: Vehicle = { ...insertVehicle, id };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }
  
  // Location methods
  async getLocation(id: number): Promise<Location | undefined> {
    return this.locations.get(id);
  }
  
  async getAllLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }
  
  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = this.locationIdCounter++;
    const location: Location = { ...insertLocation, id };
    this.locations.set(id, location);
    return location;
  }
  
  // Parking spot methods
  async getParkingSpot(id: number): Promise<ParkingSpot | undefined> {
    return this.parkingSpots.get(id);
  }
  
  async getParkingSpotsByLocation(locationId: number): Promise<ParkingSpot[]> {
    return Array.from(this.parkingSpots.values()).filter(
      (spot) => spot.locationId === locationId
    );
  }
  
  async updateParkingSpotStatus(id: number, status: string): Promise<ParkingSpot | undefined> {
    const spot = this.parkingSpots.get(id);
    if (spot) {
      const updatedSpot = { ...spot, status };
      this.parkingSpots.set(id, updatedSpot);
      return updatedSpot;
    }
    return undefined;
  }
  
  async createParkingSpot(insertSpot: InsertParkingSpot): Promise<ParkingSpot> {
    const id = this.parkingSpotIdCounter++;
    const spot: ParkingSpot = { ...insertSpot, id };
    this.parkingSpots.set(id, spot);
    return spot;
  }
  
  // Booking methods
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const booking: Booking = { ...insertBooking, id };
    this.bookings.set(id, booking);
    
    // Update parking spot status
    await this.updateParkingSpotStatus(booking.spotId, "occupied");
    
    return booking;
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      const updatedBooking = { ...booking, status };
      this.bookings.set(id, updatedBooking);
      
      // If completed, update parking spot status back to available
      if (status === "completed") {
        await this.updateParkingSpotStatus(booking.spotId, "available");
      }
      
      return updatedBooking;
    }
    return undefined;
  }
  
  // Activity methods
  async getRecentActivities(limit: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
  
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.activityIdCounter++;
    const activity: Activity = { 
      ...insertActivity, 
      id,
      timestamp: insertActivity.timestamp || new Date()
    };
    this.activities.set(id, activity);
    return activity;
  }
  
  // Sample data initialization
  private async initializeSampleData() {
    // Create default locations
    const downtownGarage = await this.createLocation({
      name: "Downtown Garage",
      address: "123 Main St, Downtown",
      totalSpots: 50,
      hourlyRate: 250, // $2.50 per hour
    });
    
    const centralMall = await this.createLocation({
      name: "Central Mall Parking",
      address: "456 Market St, Center City",
      totalSpots: 100,
      hourlyRate: 300, // $3.00 per hour
    });
    
    const airportTerminal = await this.createLocation({
      name: "Airport Terminal P3",
      address: "789 Airport Blvd, Runway City",
      totalSpots: 200,
      hourlyRate: 400, // $4.00 per hour
    });
    
    // Create parking spots for each location
    for (let i = 1; i <= 20; i++) {
      const status = Math.random() > 0.6 ? "available" : "occupied";
      await this.createParkingSpot({
        locationId: downtownGarage.id,
        spotNumber: `A${i}`,
        status,
        sensorId: `DT-A${i}`,
      });
    }
    
    for (let i = 1; i <= 20; i++) {
      const status = Math.random() > 0.5 ? "available" : "occupied";
      await this.createParkingSpot({
        locationId: centralMall.id,
        spotNumber: `B${i}`,
        status,
        sensorId: `CM-B${i}`,
      });
    }
    
    for (let i = 1; i <= 20; i++) {
      const status = Math.random() > 0.7 ? "available" : "occupied";
      await this.createParkingSpot({
        locationId: airportTerminal.id,
        spotNumber: `C${i}`,
        status,
        sensorId: `AT-C${i}`,
      });
    }
    
    // Create sample activities
    const activityTypes = ["spot_occupied", "spot_available", "booking_created", "payment_processed"];
    for (let i = 0; i < 10; i++) {
      const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      let description = "";
      
      switch (type) {
        case "spot_occupied":
          description = `Vehicle entered spot ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}${Math.floor(Math.random() * 20) + 1}`;
          break;
        case "spot_available":
          description = `Spot ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}${Math.floor(Math.random() * 20) + 1} became available`;
          break;
        case "booking_created":
          description = "New reservation made";
          break;
        case "payment_processed":
          description = "Payment processed";
          break;
      }
      
      await this.createActivity({
        userId: null,
        type,
        description,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)),
        relatedId: null,
        metadata: null,
      });
    }
  }
}

export const storage = new MemStorage();
