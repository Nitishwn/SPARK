import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  licensePlate: text("license_plate").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year"),
});

export const parkingFacilities = pgTable("parking_facilities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  totalSpots: integer("total_spots").notNull(),
  hourlyRate: integer("hourly_rate").notNull(), // in cents
  fullDayRate: integer("full_day_rate"), // in cents
  hasEVCharging: boolean("has_ev_charging").default(false),
});

export const parkingSpots = pgTable("parking_spots", {
  id: serial("id").primaryKey(),
  facilityId: integer("facility_id").notNull().references(() => parkingFacilities.id),
  spotNumber: text("spot_number").notNull(),
  spotType: text("spot_type").notNull(), // standard, premium, handicap, ev
  status: text("status").notNull(), // available, occupied, reserved, maintenance
  floor: integer("floor").default(1),
  section: text("section"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  vehicleId: integer("vehicle_id").notNull().references(() => vehicles.id),
  spotId: integer("spot_id").notNull().references(() => parkingSpots.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: text("status").notNull(), // active, completed, cancelled
  totalAmount: integer("total_amount").notNull(), // in cents
  paymentStatus: text("payment_status").notNull(), // pending, paid, refunded
  createdAt: timestamp("created_at").defaultNow(),
});

// ZOD schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type ParkingFacility = typeof parkingFacilities.$inferSelect;
export type ParkingSpot = typeof parkingSpots.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type LoginData = z.infer<typeof loginSchema>;
