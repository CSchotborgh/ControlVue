/**
 * EDGERACK Cooling Unit Control System - Data Storage Layer
 * 
 * This file defines the storage interface and in-memory implementation for the
 * cooling unit monitoring system. It handles user data, real-time sensor readings,
 * and control settings with a standardized interface that can be extended to
 * support database storage in production environments.
 */

import { type User, type InsertUser, type CoolingUnitData, type InsertCoolingUnitData, type ControlSettings, type InsertControlSettings } from "@shared/schema";
import { randomUUID } from "crypto";

/**
 * Storage Interface Definition
 * 
 * This interface defines all storage operations needed by the cooling unit system.
 * It abstracts the storage layer to allow switching between in-memory storage
 * (development) and database storage (production) without changing business logic.
 */
export interface IStorage {
  // User management operations for authentication and authorization
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cooling unit data operations for real-time monitoring
  getLatestCoolingUnitData(): Promise<CoolingUnitData | undefined>;
  createCoolingUnitData(data: InsertCoolingUnitData): Promise<CoolingUnitData>;
  
  // Control settings operations for system configuration
  getControlSettings(): Promise<ControlSettings | undefined>;
  updateControlSettings(settings: InsertControlSettings): Promise<ControlSettings>;
}

/**
 * In-Memory Storage Implementation
 * 
 * This class provides a complete in-memory storage solution for development
 * and testing. It stores all data in memory using Maps and Arrays, making it
 * perfect for development environments where data persistence isn't required.
 * In production, this can be replaced with a database-backed implementation.
 */
export class MemStorage implements IStorage {
  // User storage using Map for fast lookups by ID
  private users: Map<string, User>;
  
  // Cooling unit data storage using Array for time-series data
  private coolingUnitData: CoolingUnitData[];
  
  // Single control settings instance for system configuration
  private controlSettings: ControlSettings | undefined;

  /**
   * Constructor - Initialize Storage
   * 
   * Sets up the in-memory storage containers and initializes the system
   * with default control settings and realistic initial cooling unit data.
   * This provides a working system state immediately upon startup.
   */
  constructor() {
    this.users = new Map();
    this.coolingUnitData = [];
    
    // Initialize default control settings matching real EDGERACK system parameters
    this.controlSettings = {
      id: randomUUID(),
      controlMode: "Supply Air",           // Control based on supply air temperature
      supplyAirTarget: 19.0,              // 19°C target (66.2°F)
      returnAirTarget: 24.0,              // 24°C target (75.2°F)
      updatedAt: new Date(),
    };
    
    // Generate initial realistic cooling unit data to start monitoring immediately
    this.generateInitialData();
  }

  /**
   * Generate Initial Cooling Unit Data
   * 
   * Creates realistic baseline cooling unit data that matches actual EDGERACK
   * system readings. All temperature values are in Celsius for internal storage
   * and will be converted to Fahrenheit in the frontend for display.
   */
  private generateInitialData() {
    const data: CoolingUnitData = {
      id: randomUUID(),
      timestamp: new Date(),
      
      // System operational states - typical running configuration
      machineState: true,                    // Main system power ON
      selfCheckState: false,                 // Self-check not in progress
      coolingState: true,                    // Cooling system active
      heatingState: false,                   // Heating not needed
      dehumidifierState: false,              // Dehumidifier not active
      humidifierState: false,                // Humidifier not active
      dryContactAlarmingState: false,        // No alarm conditions
      
      // Temperature readings in Celsius (converted to Fahrenheit in frontend)
      returnAirTemp: 25.8,                   // 78.5°F - return air temperature
      supplyAirTemp: 19.3,                   // 66.8°F - conditioned supply air
      dischargeTemp: 51.8,                   // 125.3°F - compressor discharge
      suctionTemp: 14.6,                     // 58.2°F - compressor suction
      evaporatorTemp: 11.2,                  // 52.1°F - evaporator coil
      
      // Humidity readings as percentages
      returnAirHumidity: 45.0,               // 45% RH return air
      supplyAirHumidity: 38.0,               // 38% RH conditioned air
      
      // Motor speeds in RPM - realistic operating values
      internalFanRpm: 920,                   // Internal circulation fan
      externalFanRpm: 1550,                  // External condenser fan
      condenserMotorRpm: 1100,               // Compressor motor
      
      // Electrical readings
      acVoltage: 240.5,                      // AC voltage supply
    };
    
    // Add the initial data to the storage array
    this.coolingUnitData.push(data);
  }

  // ==========================
  // USER MANAGEMENT METHODS
  // ==========================

  /**
   * Get User by ID
   * 
   * Retrieves a user record by their unique ID for authentication and
   * authorization operations.
   * 
   * @param id - Unique user identifier
   * @returns User object or undefined if not found
   */
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  /**
   * Get User by Username
   * 
   * Finds a user by their username for login authentication.
   * Searches through all users to find a matching username.
   * 
   * @param username - Username to search for
   * @returns User object or undefined if not found
   */
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  /**
   * Create New User
   * 
   * Creates a new user account with a generated UUID and stores it
   * in the user map for future authentication.
   * 
   * @param insertUser - User data without ID
   * @returns Complete user object with generated ID
   */
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // ==============================
  // COOLING UNIT DATA METHODS
  // ==============================

  /**
   * Get Latest Cooling Unit Data
   * 
   * Returns the most recent cooling unit sensor readings and operational
   * status. This is called every 2 seconds by the frontend for real-time
   * monitoring displays.
   * 
   * @returns Latest cooling unit data or undefined if no data exists
   */
  async getLatestCoolingUnitData(): Promise<CoolingUnitData | undefined> {
    return this.coolingUnitData[this.coolingUnitData.length - 1];
  }

  /**
   * Create New Cooling Unit Data Record
   * 
   * Stores new cooling unit sensor readings with auto-generated ID and timestamp.
   * Manages memory usage by keeping only the most recent 100 records.
   * Provides default values for optional boolean states to ensure data consistency.
   * 
   * @param data - Cooling unit sensor data without ID and timestamp
   * @returns Complete cooling unit data record with ID and timestamp
   */
  async createCoolingUnitData(data: InsertCoolingUnitData): Promise<CoolingUnitData> {
    const newData: CoolingUnitData = {
      id: randomUUID(),
      timestamp: new Date(),
      
      // Use provided values or sensible defaults for operational states
      machineState: data.machineState ?? true,
      selfCheckState: data.selfCheckState ?? false,
      coolingState: data.coolingState ?? true,
      heatingState: data.heatingState ?? false,
      dehumidifierState: data.dehumidifierState ?? false,
      humidifierState: data.humidifierState ?? false,
      dryContactAlarmingState: data.dryContactAlarmingState ?? false,
      
      // Copy all sensor readings directly (required fields)
      returnAirTemp: data.returnAirTemp,
      supplyAirTemp: data.supplyAirTemp,
      dischargeTemp: data.dischargeTemp,
      suctionTemp: data.suctionTemp,
      evaporatorTemp: data.evaporatorTemp,
      returnAirHumidity: data.returnAirHumidity,
      supplyAirHumidity: data.supplyAirHumidity,
      internalFanRpm: data.internalFanRpm,
      externalFanRpm: data.externalFanRpm,
      condenserMotorRpm: data.condenserMotorRpm,
      acVoltage: data.acVoltage,
    };
    
    // Add the new data to the time-series array
    this.coolingUnitData.push(newData);
    
    // Memory management: Keep only the last 100 records to prevent memory bloat
    // This maintains recent history while preventing unlimited memory growth
    if (this.coolingUnitData.length > 100) {
      this.coolingUnitData = this.coolingUnitData.slice(-100);
    }
    
    return newData;
  }

  // ============================
  // CONTROL SETTINGS METHODS
  // ============================

  /**
   * Get Control Settings
   * 
   * Retrieves the current system control settings including control mode,
   * target temperatures, and other operational parameters.
   * 
   * @returns Current control settings or undefined if not initialized
   */
  async getControlSettings(): Promise<ControlSettings | undefined> {
    return this.controlSettings;
  }

  /**
   * Update Control Settings
   * 
   * Updates the system control settings with new values and sets the
   * updated timestamp. Changes take effect immediately for system control.
   * 
   * @param settings - New control settings data
   * @returns Updated control settings with new timestamp
   */
  async updateControlSettings(settings: InsertControlSettings): Promise<ControlSettings> {
    this.controlSettings = {
      ...this.controlSettings!,
      ...settings,
      updatedAt: new Date(),    // Track when settings were last modified
    };
    return this.controlSettings;
  }
}

/**
 * Storage Instance Export
 * 
 * Creates and exports a singleton instance of the MemStorage class for use
 * throughout the application. This ensures all parts of the system use the
 * same storage instance and data remains consistent across requests.
 */
export const storage = new MemStorage();
