import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRealTimeData, formatTemperature } from "@/hooks/use-real-time-data";
import { Skeleton } from "@/components/ui/skeleton";

export function NetworkView() {
  const { data: coolingData, isLoading } = useRealTimeData();

  if (isLoading) {
    return (
      <Card className="edgerack-card">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const networkData = coolingData ? [
    {
      description: "Return Air Temperature",
      value: `${formatTemperature(coolingData.returnAirTemp)} °F (${coolingData.returnAirTemp.toFixed(1)} °C)`
    },
    {
      description: "Return Air Humidity",
      value: `${coolingData.returnAirHumidity.toFixed(0)}%`
    },
    {
      description: "Supply Air Temperature",
      value: `${formatTemperature(coolingData.supplyAirTemp)} °F (${coolingData.supplyAirTemp.toFixed(1)} °C)`
    },
    {
      description: "Supply Air Humidity",
      value: `${coolingData.supplyAirHumidity.toFixed(0)}%`
    },
    {
      description: "Internal Fan",
      value: `${coolingData.internalFanRpm} RPM`
    },
    {
      description: "External Fan",
      value: `${coolingData.externalFanRpm} RPM`
    },
    {
      description: "Condenser Motor",
      value: `${coolingData.condenserMotorRpm} RPM`
    },
    {
      description: "AC Voltage",
      value: `${coolingData.acVoltage.toFixed(1)} V`
    },
    {
      description: "Discharge Temperature",
      value: `${formatTemperature(coolingData.dischargeTemp)} °F (${coolingData.dischargeTemp.toFixed(1)} °C)`
    },
    {
      description: "Suction Temperature",
      value: `${formatTemperature(coolingData.suctionTemp)} °F (${coolingData.suctionTemp.toFixed(1)} °C)`
    },
    {
      description: "Evaporator Temperature",
      value: `${formatTemperature(coolingData.evaporatorTemp)} °F (${coolingData.evaporatorTemp.toFixed(1)} °C)`
    }
  ] : [];

  return (
    <Card className="edgerack-card">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Real Time Network Data:</h2>
        <div className="overflow-x-auto">
          <Table className="edgerack-table">
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 text-slate-400 uppercase">Description</TableHead>
                <TableHead className="px-6 py-3 text-slate-400 uppercase">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networkData.map((item, index) => (
                <TableRow key={index} className="border-b border-slate-700 hover:bg-slate-700">
                  <TableCell className="px-6 py-4 font-medium text-white">
                    {item.description}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-300">
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
