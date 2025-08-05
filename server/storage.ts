import { type User, type InsertUser, type CoolingUnitData, type InsertCoolingUnitData, type ControlSettings, type InsertControlSettings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cooling unit data
  getLatestCoolingUnitData(): Promise<CoolingUnitData | undefined>;
  createCoolingUnitData(data: InsertCoolingUnitData): Promise<CoolingUnitData>;
  
  // Control settings
  getControlSettings(): Promise<ControlSettings | undefined>;
  updateControlSettings(settings: InsertControlSettings): Promise<ControlSettings>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private coolingUnitData: CoolingUnitData[];
  private controlSettings: ControlSettings | undefined;

  constructor() {
    this.users = new Map();
    this.coolingUnitData = [];
    
    // Initialize default control settings
    this.controlSettings = {
      id: randomUUID(),
      controlMode: "Supply Air",
      supplyAirTarget: 19.0,
      returnAirTarget: 24.0,
      updatedAt: new Date(),
    };
    
    // Generate initial realistic cooling unit data
    this.generateInitialData();
  }

  private generateInitialData() {
    const data: CoolingUnitData = {
      id: randomUUID(),
      timestamp: new Date(),
      machineState: true,
      selfCheckState: false,
      coolingState: true,
      heatingState: false,
      dehumidifierState: false,
      humidifierState: false,
      dryContactAlarmingState: false,
      returnAirTemp: 25.8, // ~78.5°F
      supplyAirTemp: 19.3, // ~66.8°F
      dischargeTemp: 51.8, // ~125.3°F
      suctionTemp: 14.6, // ~58.2°F
      evaporatorTemp: 11.2, // ~52.1°F
      returnAirHumidity: 45.0,
      supplyAirHumidity: 38.0,
      internalFanRpm: 920,
      externalFanRpm: 1550,
      condenserMotorRpm: 1100,
      acVoltage: 240.5,
    };
    
    this.coolingUnitData.push(data);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getLatestCoolingUnitData(): Promise<CoolingUnitData | undefined> {
    return this.coolingUnitData[this.coolingUnitData.length - 1];
  }

  async createCoolingUnitData(data: InsertCoolingUnitData): Promise<CoolingUnitData> {
    const newData: CoolingUnitData = {
      ...data,
      id: randomUUID(),
      timestamp: new Date(),
    };
    
    this.coolingUnitData.push(newData);
    
    // Keep only last 100 records to prevent memory issues
    if (this.coolingUnitData.length > 100) {
      this.coolingUnitData = this.coolingUnitData.slice(-100);
    }
    
    return newData;
  }

  async getControlSettings(): Promise<ControlSettings | undefined> {
    return this.controlSettings;
  }

  async updateControlSettings(settings: InsertControlSettings): Promise<ControlSettings> {
    this.controlSettings = {
      ...this.controlSettings!,
      ...settings,
      updatedAt: new Date(),
    };
    return this.controlSettings;
  }
}

export const storage = new MemStorage();
