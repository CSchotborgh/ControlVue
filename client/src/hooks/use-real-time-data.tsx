import { useQuery } from '@tanstack/react-query';
import { CoolingUnitData } from '@shared/schema';

export function useRealTimeData() {
  return useQuery<CoolingUnitData>({
    queryKey: ['/api/cooling-unit/data'],
    refetchInterval: 1000, // Fetch every 1 second for real-time updates
    staleTime: 0, // Always consider data stale for real-time behavior
  });
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function formatTemperature(celsius: number): string {
  return celsiusToFahrenheit(celsius).toFixed(1);
}
