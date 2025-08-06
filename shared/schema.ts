/**
 * EDGERACK Cooling Unit Control System - Database Schema & Validation
 * 
 * This file defines the complete database schema using Drizzle ORM along with
 * Zod validation schemas for type-safe data handling. It provides shared types
 * and validation schemas used by both frontend and backend components to ensure
 * data consistency throughout the application.
 */

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ================================
// DATABASE TABLE DEFINITIONS
// ================================

/**
 * Users Table Schema
 * 
 * Stores user authentication and profile information for system access control.
 * Uses UUID primary keys for security and supports unique username constraints.
 */
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),    // Unique username for login
  password: text("password").notNull(),             // Hashed password for security
});

/**
 * Cooling Unit Data Table Schema
 * 
 * Stores real-time and historical cooling unit sensor readings and operational states.
 * This is the core table for monitoring system performance, temperatures, humidity,
 * motor speeds, and electrical parameters. Data is collected every 2 seconds for
 * real-time monitoring and historical analysis.
 */
export const coolingUnitData = pgTable("cooling_unit_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  timestamp: timestamp("timestamp").defaultNow().notNull(),      // Auto-generated timestamp
  
  // ===========================
  // OPERATIONAL STATE BOOLEANS
  // ===========================
  machineState: boolean("machine_state").notNull().default(true),           // Main system power
  selfCheckState: boolean("self_check_state").notNull().default(false),     // Self-diagnostic mode
  coolingState: boolean("cooling_state").notNull().default(true),           // Cooling system active
  heatingState: boolean("heating_state").notNull().default(false),          // Heating system active
  dehumidifierState: boolean("dehumidifier_state").notNull().default(false),// Dehumidifier active
  humidifierState: boolean("humidifier_state").notNull().default(false),    // Humidifier active
  dryContactAlarmingState: boolean("dry_contact_alarming_state").notNull().default(false), // Alarm state
  
  // ===============================
  // TEMPERATURE SENSORS (CELSIUS)
  // ===============================
  // Note: All temperatures stored in Celsius, converted to Fahrenheit in frontend
  returnAirTemp: real("return_air_temp").notNull(),        // Return air temperature from space
  supplyAirTemp: real("supply_air_temp").notNull(),        // Conditioned supply air temperature
  dischargeTemp: real("discharge_temp").notNull(),         // Compressor discharge temperature
  suctionTemp: real("suction_temp").notNull(),             // Compressor suction temperature
  evaporatorTemp: real("evaporator_temp").notNull(),       // Evaporator coil temperature
  
  // ======================
  // HUMIDITY SENSORS (%)
  // ======================
  returnAirHumidity: real("return_air_humidity").notNull(), // Return air relative humidity
  supplyAirHumidity: real("supply_air_humidity").notNull(), // Supply air relative humidity
  
  // ===========================
  // MOTOR SPEEDS (RPM) & POWER
  // ===========================
  internalFanRpm: integer("internal_fan_rpm").notNull(),    // Internal circulation fan
  externalFanRpm: integer("external_fan_rpm").notNull(),    // External condenser fan
  condenserMotorRpm: integer("condenser_motor_rpm").notNull(), // Compressor motor
  acVoltage: real("ac_voltage").notNull(),                   // AC electrical supply voltage
});

/**
 * Control Settings Table Schema
 * 
 * Stores system control configuration including control mode, target temperatures,
 * and operational parameters. These settings determine how the cooling unit operates
 * and maintains environmental conditions. Changes to these settings take effect
 * immediately in the control algorithms.
 */
export const controlSettings = pgTable("control_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  controlMode: text("control_mode").notNull().default("Supply Air"),    // Control method: "Supply Air" or "Return Air"
  supplyAirTarget: real("supply_air_target").notNull().default(19.0),   // Target supply air temp (Celsius)
  returnAirTarget: real("return_air_target").notNull().default(24.0),   // Target return air temp (Celsius)
  updatedAt: timestamp("updated_at").defaultNow().notNull(),            // Last modification timestamp
});

// ============================
// ZOD VALIDATION SCHEMAS
// ============================

/**
 * User Insert Schema
 * 
 * Validation schema for creating new users. Excludes the auto-generated ID field
 * and ensures username and password are provided for new user registration.
 */
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,    // Required: unique username for login
  password: true,    // Required: password for authentication
});

/**
 * Cooling Unit Data Insert Schema
 * 
 * Validation schema for new cooling unit data records. Excludes auto-generated
 * fields (ID and timestamp) while validating all sensor readings and operational
 * states to ensure data integrity before storage.
 */
export const insertCoolingUnitDataSchema = createInsertSchema(coolingUnitData).omit({
  id: true,         // Auto-generated UUID
  timestamp: true,  // Auto-generated timestamp
});

/**
 * Control Settings Insert Schema
 * 
 * Validation schema for updating control settings. Excludes auto-managed fields
 * while validating control mode and target temperature values to ensure safe
 * operational parameters.
 */
export const insertControlSettingsSchema = createInsertSchema(controlSettings).omit({
  id: true,        // Primary key, not user-modifiable
  updatedAt: true, // Auto-updated timestamp
});

// ============================
// TYPE DEFINITIONS
// ============================

/**
 * TypeScript Type Exports
 * 
 * These types provide full type safety throughout the application by inferring
 * types directly from the database schemas and validation schemas. They ensure
 * consistency between database structure and application logic.
 */

// User-related types for authentication and authorization
export type InsertUser = z.infer<typeof insertUserSchema>;           // New user creation data
export type User = typeof users.$inferSelect;                       // Complete user record

// Cooling unit data types for sensor readings and monitoring
export type CoolingUnitData = typeof coolingUnitData.$inferSelect;           // Complete cooling data record
export type InsertCoolingUnitData = z.infer<typeof insertCoolingUnitDataSchema>; // New cooling data input

// Control settings types for system configuration
export type ControlSettings = typeof controlSettings.$inferSelect;               // Complete settings record
export type InsertControlSettings = z.infer<typeof insertControlSettingsSchema>; // Settings update input
