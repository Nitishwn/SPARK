import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: text("role").default("user").notNull(),
});

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  licensePlate: text("license_plate").notNull(),
  color: text("color"),
});

export const parkingSpots = pgTable("parking_spots", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull(),
  spotNumber: text("spot_number").notNull(),
  status: text("status").default("available").notNull(),
  sensorId: text("sensor_id"),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  totalSpots: integer("total_spots").notNull(),
  hourlyRate: integer("hourly_rate").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  vehicleId: integer("vehicle_id").notNull(),
  spotId: integer("spot_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: text("status").default("active").notNull(),
  amount: integer("amount"),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  type: text("type").notNull(),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  relatedId: integer("related_id"),
  metadata: text("metadata"),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
}).omit({ id: true });

export const insertVehicleSchema = createInsertSchema(vehicles).omit({ id: true });

export const insertParkingSpotSchema = createInsertSchema(parkingSpots).omit({ id: true });

export const insertLocationSchema = createInsertSchema(locations).omit({ id: true });

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });

export const insertActivitySchema = createInsertSchema(activities).omit({ id: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;

export type InsertParkingSpot = z.infer<typeof insertParkingSpotSchema>;
export type ParkingSpot = typeof parkingSpots.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
