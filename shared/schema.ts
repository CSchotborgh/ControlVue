import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const coolingUnitData = pgTable("cooling_unit_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  
  // States
  machineState: boolean("machine_state").notNull().default(true),
  selfCheckState: boolean("self_check_state").notNull().default(false),
  coolingState: boolean("cooling_state").notNull().default(true),
  heatingState: boolean("heating_state").notNull().default(false),
  dehumidifierState: boolean("dehumidifier_state").notNull().default(false),
  humidifierState: boolean("humidifier_state").notNull().default(false),
  dryContactAlarmingState: boolean("dry_contact_alarming_state").notNull().default(false),
  
  // Temperatures (in Celsius, will convert to Fahrenheit in frontend)
  returnAirTemp: real("return_air_temp").notNull(),
  supplyAirTemp: real("supply_air_temp").notNull(),
  dischargeTemp: real("discharge_temp").notNull(),
  suctionTemp: real("suction_temp").notNull(),
  evaporatorTemp: real("evaporator_temp").notNull(),
  
  // Humidity
  returnAirHumidity: real("return_air_humidity").notNull(),
  supplyAirHumidity: real("supply_air_humidity").notNull(),
  
  // Motors and Electrical
  internalFanRpm: integer("internal_fan_rpm").notNull(),
  externalFanRpm: integer("external_fan_rpm").notNull(),
  condenserMotorRpm: integer("condenser_motor_rpm").notNull(),
  acVoltage: real("ac_voltage").notNull(),
});

export const controlSettings = pgTable("control_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  controlMode: text("control_mode").notNull().default("Supply Air"), // "Supply Air" or "Return Air"
  supplyAirTarget: real("supply_air_target").notNull().default(19.0), // Celsius
  returnAirTarget: real("return_air_target").notNull().default(24.0), // Celsius
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCoolingUnitDataSchema = createInsertSchema(coolingUnitData).omit({
  id: true,
  timestamp: true,
});

export const insertControlSettingsSchema = createInsertSchema(controlSettings).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CoolingUnitData = typeof coolingUnitData.$inferSelect;
export type InsertCoolingUnitData = z.infer<typeof insertCoolingUnitDataSchema>;
export type ControlSettings = typeof controlSettings.$inferSelect;
export type InsertControlSettings = z.infer<typeof insertControlSettingsSchema>;
