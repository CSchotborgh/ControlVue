/**
 * EDGERACK Cooling Unit Control System - Real-Time Data Hook & Utilities
 * 
 * Provides real-time cooling unit data fetching and temperature conversion utilities.
 * This hook manages continuous polling of sensor data and provides formatting functions
 * for displaying temperatures in the preferred Fahrenheit format for US operations.
 */

import { useQuery } from '@tanstack/react-query';
import { CoolingUnitData } from '@shared/schema';

/**
 * Real-Time Data Hook
 * 
 * Fetches cooling unit sensor data continuously for real-time monitoring.
 * Data is refreshed every 1 second to provide up-to-date temperature,
 * humidity, and operational status information for the dashboard displays.
 * 
 * @returns TanStack Query result with current cooling unit data
 * 
 * @example
 * const { data, isLoading, error } = useRealTimeData();
 * if (data) {
 *   return <TemperatureDisplay temp={data.returnAirTemp} />;
 * }
 */
export function useRealTimeData() {
  return useQuery<CoolingUnitData>({
    queryKey: ['/api/cooling-unit/data'],
    refetchInterval: 1000,    // Poll every 1 second for real-time updates
    staleTime: 0,            // Always consider data stale to ensure fresh reads
  });
}

/**
 * Temperature Conversion Utility
 * 
 * Converts temperature values from Celsius (stored in database) to Fahrenheit
 * (displayed in UI) for consistency with US industrial standards.
 * 
 * @param celsius - Temperature value in Celsius
 * @returns Temperature value in Fahrenheit
 * 
 * @example
 * const tempF = celsiusToFahrenheit(25.0); // Returns 77.0
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

/**
 * Temperature Formatting Utility
 * 
 * Converts Celsius temperature to formatted Fahrenheit string with one decimal place.
 * Used throughout the UI for consistent temperature display formatting.
 * 
 * @param celsius - Temperature value in Celsius
 * @returns Formatted temperature string in Fahrenheit (e.g., "77.5")
 * 
 * @example
 * const displayTemp = formatTemperature(25.0); // Returns "77.0"
 * return <span>{displayTemp}°F</span>;
 */
export function formatTemperature(celsius: number): string {
  return celsiusToFahrenheit(celsius).toFixed(1);
}
