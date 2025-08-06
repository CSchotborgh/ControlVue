/**
 * EDGERACK Cooling Unit Control System - API Routes
 * 
 * This file defines all REST API endpoints for the cooling unit monitoring system.
 * Routes handle real-time data retrieval, control settings management, and data updates.
 * All endpoints use JSON for data exchange and include proper error handling.
 */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCoolingUnitDataSchema, insertControlSettingsSchema } from "@shared/schema";

/**
 * Register All API Routes
 * 
 * This function sets up all REST API endpoints and creates an HTTP server instance.
 * It also initializes the real-time data generation system for simulating live
 * cooling unit sensor readings and status updates.
 * 
 * @param app - Express application instance
 * @returns HTTP server instance for listening on a port
 */
export async function registerRoutes(app: Express): Promise<Server> {
  
  /**
   * GET /api/cooling-unit/data
   * 
   * Retrieves the latest cooling unit sensor readings and operational status.
   * This endpoint is called every 2 seconds by the frontend for real-time monitoring.
   * Returns temperature, humidity, fan speeds, voltages, and system states.
   */
  app.get("/api/cooling-unit/data", async (req, res) => {
    try {
      // Fetch the most recent cooling unit data from storage
      const data = await storage.getLatestCoolingUnitData();
      
      // Return the data as JSON (includes ETag headers for caching)
      res.json(data);
    } catch (error) {
      // Return structured error response if data retrieval fails
      res.status(500).json({ message: "Failed to get cooling unit data" });
    }
  });

  /**
   * POST /api/cooling-unit/data
   * 
   * Accepts new cooling unit data for manual updates or external sensor integration.
   * Validates the incoming data against the schema before storing it in memory.
   * Used for simulating data updates and integrating with real hardware sensors.
   */
  app.post("/api/cooling-unit/data", async (req, res) => {
    try {
      // Validate the incoming data against the Zod schema to ensure data integrity
      const validatedData = insertCoolingUnitDataSchema.parse(req.body);
      
      // Store the validated data and get the complete record with ID and timestamp
      const newData = await storage.createCoolingUnitData(validatedData);
      
      // Return the newly created data record
      res.json(newData);
    } catch (error) {
      // Return validation error if the data doesn't match the expected schema
      res.status(400).json({ message: "Invalid cooling unit data" });
    }
  });

  /**
   * GET /api/control-settings
   * 
   * Retrieves the current control settings for the cooling unit system.
   * Includes control mode (Supply Air/Return Air), target temperatures,
   * and other operational parameters used by the cooling algorithms.
   */
  app.get("/api/control-settings", async (req, res) => {
    try {
      // Fetch current control settings from storage
      const settings = await storage.getControlSettings();
      
      // Return the settings as JSON
      res.json(settings);
    } catch (error) {
      // Return error if settings retrieval fails
      res.status(500).json({ message: "Failed to get control settings" });
    }
  });

  /**
   * PUT /api/control-settings
   * 
   * Updates the cooling unit control settings with new values.
   * Validates the settings data and updates the stored configuration.
   * Changes take effect immediately for real-time control adjustments.
   */
  app.put("/api/control-settings", async (req, res) => {
    try {
      // Validate the incoming settings data against the schema
      const validatedSettings = insertControlSettingsSchema.parse(req.body);
      
      // Update the settings in storage and get the updated record
      const updatedSettings = await storage.updateControlSettings(validatedSettings);
      
      // Return the updated settings
      res.json(updatedSettings);
    } catch (error) {
      // Return validation error if the settings data is invalid
      res.status(400).json({ message: "Invalid control settings" });
    }
  });

  /**
   * Real-time Data Simulation System
   * 
   * This function generates realistic cooling unit data variations to simulate
   * live sensor readings. It adds small random fluctuations to temperature,
   * humidity, and motor speed values to create a realistic monitoring experience.
   */
  const generateRealtimeData = () => {
    // Get the current latest data to use as a baseline for variations
    const latestData = storage.getLatestCoolingUnitData();
    
    latestData.then(data => {
      if (data) {
        // Generate new data with realistic variations based on actual cooling unit behavior
        const newData = {
          ...data,
          // Temperature variations: ±0.5°C for return air, ±0.25°C for supply air
          returnAirTemp: data.returnAirTemp + (Math.random() - 0.5) * 1.0,
          supplyAirTemp: data.supplyAirTemp + (Math.random() - 0.5) * 0.5,
          
          // Humidity variations: ±1.5% for return air, ±1% for supply air (clamped to 0-100%)
          returnAirHumidity: Math.max(0, Math.min(100, data.returnAirHumidity + (Math.random() - 0.5) * 3)),
          supplyAirHumidity: Math.max(0, Math.min(100, data.supplyAirHumidity + (Math.random() - 0.5) * 2)),
          
          // Motor speed variations: realistic fluctuations for different fan types
          internalFanRpm: Math.max(0, data.internalFanRpm + Math.floor((Math.random() - 0.5) * 40)),
          externalFanRpm: Math.max(0, data.externalFanRpm + Math.floor((Math.random() - 0.5) * 60)),
          condenserMotorRpm: Math.max(0, data.condenserMotorRpm + Math.floor((Math.random() - 0.5) * 50)),
        };
        
        // Remove ID and timestamp as these will be auto-generated by storage
        delete (newData as any).id;
        delete (newData as any).timestamp;
        
        // Store the new simulated data point
        storage.createCoolingUnitData(newData);
      }
    });
  };

  /**
   * Real-time Data Generation Timer
   * 
   * Generates new cooling unit data every 2 seconds to simulate live sensor readings.
   * This provides continuous data flow for the real-time monitoring dashboard.
   * The 2-second interval matches the frontend polling frequency.
   */
  setInterval(generateRealtimeData, 2000);

  // Create and return the HTTP server instance for the Express app
  const httpServer = createServer(app);
  return httpServer;
}
