import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCoolingUnitDataSchema, insertControlSettingsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get latest cooling unit data
  app.get("/api/cooling-unit/data", async (req, res) => {
    try {
      const data = await storage.getLatestCoolingUnitData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to get cooling unit data" });
    }
  });

  // Update cooling unit data (simulate real-time updates)
  app.post("/api/cooling-unit/data", async (req, res) => {
    try {
      const validatedData = insertCoolingUnitDataSchema.parse(req.body);
      const newData = await storage.createCoolingUnitData(validatedData);
      res.json(newData);
    } catch (error) {
      res.status(400).json({ message: "Invalid cooling unit data" });
    }
  });

  // Get control settings
  app.get("/api/control-settings", async (req, res) => {
    try {
      const settings = await storage.getControlSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to get control settings" });
    }
  });

  // Update control settings
  app.put("/api/control-settings", async (req, res) => {
    try {
      const validatedSettings = insertControlSettingsSchema.parse(req.body);
      const updatedSettings = await storage.updateControlSettings(validatedSettings);
      res.json(updatedSettings);
    } catch (error) {
      res.status(400).json({ message: "Invalid control settings" });
    }
  });

  // Simulate real-time data generation
  const generateRealtimeData = () => {
    const latestData = storage.getLatestCoolingUnitData();
    latestData.then(data => {
      if (data) {
        // Add realistic variations to the data
        const newData = {
          ...data,
          returnAirTemp: data.returnAirTemp + (Math.random() - 0.5) * 1.0,
          supplyAirTemp: data.supplyAirTemp + (Math.random() - 0.5) * 0.5,
          returnAirHumidity: Math.max(0, Math.min(100, data.returnAirHumidity + (Math.random() - 0.5) * 3)),
          supplyAirHumidity: Math.max(0, Math.min(100, data.supplyAirHumidity + (Math.random() - 0.5) * 2)),
          internalFanRpm: Math.max(0, data.internalFanRpm + Math.floor((Math.random() - 0.5) * 40)),
          externalFanRpm: Math.max(0, data.externalFanRpm + Math.floor((Math.random() - 0.5) * 60)),
          condenserMotorRpm: Math.max(0, data.condenserMotorRpm + Math.floor((Math.random() - 0.5) * 50)),
        };
        
        delete (newData as any).id;
        delete (newData as any).timestamp;
        
        storage.createCoolingUnitData(newData);
      }
    });
  };

  // Generate new data every 2 seconds
  setInterval(generateRealtimeData, 2000);

  const httpServer = createServer(app);
  return httpServer;
}
