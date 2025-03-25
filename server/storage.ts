import { users, vehicles, parkingFacilities, parkingSpots, bookings } from "@shared/schema";
import type { User, InsertUser, Vehicle, InsertVehicle, ParkingFacility, ParkingSpot, Booking, InsertBooking } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vehicle operations
  getVehiclesByUserId(userId: number): Promise<Vehicle[]>;
  getVehicle(id: number): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  
  // Parking facility operations
  getAllFacilities(): Promise<ParkingFacility[]>;
  getFacility(id: number): Promise<ParkingFacility | undefined>;
  
  // Parking spot operations
  getSpotsByFacility(facilityId: number): Promise<ParkingSpot[]>;
  getAvailableSpots(facilityId: number): Promise<ParkingSpot[]>;
  updateSpotStatus(id: number, status: string): Promise<ParkingSpot | undefined>;
  getSpot(id: number): Promise<ParkingSpot | undefined>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getActiveBookingsByUser(userId: number): Promise<Booking[]>;
  getRecentBookings(limit: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vehicles: Map<number, Vehicle>;
  private facilities: Map<number, ParkingFacility>;
  private spots: Map<number, ParkingSpot>;
  private bookings: Map<number, Booking>;
  
  sessionStore: session.SessionStore;
  
  private userIdCounter: number;
  private vehicleIdCounter: number;
  private facilityIdCounter: number;
  private spotIdCounter: number;
  private bookingIdCounter: number;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.facilities = new Map();
    this.spots = new Map();
    this.bookings = new Map();
    
    this.userIdCounter = 1;
    this.vehicleIdCounter = 1;
    this.facilityIdCounter = 1;
    this.spotIdCounter = 1;
    this.bookingIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24h
    });
    
    // Seed data
    this.seedData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const timestamp = new Date();
    const user: User = { ...insertUser, id, createdAt: timestamp };
    this.users.set(id, user);
    return user;
  }
  
  // Vehicle operations
  async getVehiclesByUserId(userId: number): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.userId === userId,
    );
  }
  
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }
  
  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.vehicleIdCounter++;
    const vehicle: Vehicle = { ...insertVehicle, id };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }
  
  // Parking facility operations
  async getAllFacilities(): Promise<ParkingFacility[]> {
    return Array.from(this.facilities.values());
  }
  
  async getFacility(id: number): Promise<ParkingFacility | undefined> {
    return this.facilities.get(id);
  }
  
  // Parking spot operations
  async getSpotsByFacility(facilityId: number): Promise<ParkingSpot[]> {
    return Array.from(this.spots.values()).filter(
      (spot) => spot.facilityId === facilityId,
    );
  }
  
  async getAvailableSpots(facilityId: number): Promise<ParkingSpot[]> {
    return Array.from(this.spots.values()).filter(
      (spot) => spot.facilityId === facilityId && spot.status === 'available',
    );
  }
  
  async updateSpotStatus(id: number, status: string): Promise<ParkingSpot | undefined> {
    const spot = this.spots.get(id);
    if (!spot) return undefined;
    
    const updatedSpot: ParkingSpot = { ...spot, status };
    this.spots.set(id, updatedSpot);
    return updatedSpot;
  }
  
  async getSpot(id: number): Promise<ParkingSpot | undefined> {
    return this.spots.get(id);
  }
  
  // Booking operations
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const timestamp = new Date();
    const booking: Booking = { ...insertBooking, id, createdAt: timestamp };
    this.bookings.set(id, booking);
    
    // Update spot status to reserved
    await this.updateSpotStatus(insertBooking.spotId, 'reserved');
    
    return booking;
  }
  
  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getActiveBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.userId === userId && booking.status === 'active')
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }
  
  async getRecentBookings(limit: number): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  // Seed initial data
  private seedData() {
    // Create sample facilities
    const downtown: ParkingFacility = {
      id: this.facilityIdCounter++,
      name: 'Downtown Parking Facility',
      address: '123 Main St, Downtown',
      totalSpots: 100,
      hourlyRate: 250, // $2.50
      fullDayRate: 1800, // $18.00
      hasEVCharging: true
    };
    
    const westSide: ParkingFacility = {
      id: this.facilityIdCounter++,
      name: 'West Side Garage',
      address: '456 West Blvd, West District',
      totalSpots: 75,
      hourlyRate: 200, // $2.00
      fullDayRate: 1500, // $15.00
      hasEVCharging: false
    };
    
    this.facilities.set(downtown.id, downtown);
    this.facilities.set(westSide.id, westSide);
    
    // Create parking spots for downtown facility
    const spotTypes = ['standard', 'premium', 'handicap', 'ev'];
    const sections = ['A', 'B', 'C'];
    
    for (let i = 1; i <= downtown.totalSpots; i++) {
      const section = sections[Math.floor((i - 1) / 35)];
      const spotNumber = `${section}${i % 35 + 1}`;
      const spotType = spotTypes[Math.floor(Math.random() * spotTypes.length)];
      const floor = Math.floor((i - 1) / 50) + 1;
      const status = Math.random() > 0.7 ? 'available' : 'occupied';
      
      const spot: ParkingSpot = {
        id: this.spotIdCounter++,
        facilityId: downtown.id,
        spotNumber,
        spotType,
        status,
        floor,
        section,
      };
      
      this.spots.set(spot.id, spot);
    }
    
    // Create parking spots for west side facility
    for (let i = 1; i <= westSide.totalSpots; i++) {
      const section = i <= 25 ? 'A' : i <= 50 ? 'B' : 'C';
      const spotNumber = `${section}${i % 25 + 1}`;
      const spotType = spotTypes[Math.floor(Math.random() * spotTypes.length)];
      const floor = 1;
      const status = Math.random() > 0.6 ? 'available' : 'occupied';
      
      const spot: ParkingSpot = {
        id: this.spotIdCounter++,
        facilityId: westSide.id,
        spotNumber,
        spotType,
        status,
        floor,
        section,
      };
      
      this.spots.set(spot.id, spot);
    }
  }
}

export const storage = new MemStorage();
