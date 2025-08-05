import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useRealTimeData, formatTemperature } from "@/hooks/use-real-time-data";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function CoolingUnit() {
  const { isLoggedIn } = useAuth();
  const { data: coolingData, isLoading } = useRealTimeData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [supplyTarget, setSupplyTarget] = useState("66.2");

  if (isLoading) {
    return (
      <Card className="edgerack-card mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const updatedTime = new Date().toLocaleString();

  return (
    <Card className="edgerack-card mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Cooling Unit</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-2xl hover:text-slate-300 text-white"
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        
        <div className={`collapsible-content ${isExpanded ? 'expanded' : ''}`}>
          {/* Controls Section */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-800 px-4 text-sm font-medium uppercase text-white">
                Controls
              </span>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="text-center text-sm italic text-slate-400 mb-4">
              Log in to modify controls
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Machine Control */}
            <div className="custom-grid">
              <div className="table-label mb-2">Machine:</div>
              <div className="mb-3">
                <Badge className={`status-badge ${coolingData?.machineState ? 'on' : 'off'}`}>
                  {coolingData?.machineState ? 'ON' : 'OFF'}
                </Badge>
              </div>
              {isLoggedIn && (
                <div>
                  <button className={`toggle-switch ${coolingData?.machineState ? 'active' : ''}`}>
                    <span className={`toggle-slider ${coolingData?.machineState ? 'active' : ''}`}></span>
                  </button>
                </div>
              )}
            </div>

            {/* Control Mode */}
            <div className="custom-grid">
              <div className="table-label mb-2">Control Mode:</div>
              <div className="mb-3">
                <Badge className="status-badge on">Supply Air</Badge>
              </div>
              {isLoggedIn && (
                <div>
                  <button className="toggle-switch active">
                    <span className="toggle-slider active"></span>
                  </button>
                </div>
              )}
            </div>

            {/* Temperature Target */}
            <div className="custom-grid">
              <div className="table-label mb-2">Supply Air Target (°F):</div>
              <div className="text-4xl mb-3 text-white">{supplyTarget}</div>
              {isLoggedIn && (
                <div>
                  <Input
                    type="number"
                    className="bg-slate-700 border-slate-600 text-white text-sm"
                    value={supplyTarget}
                    onChange={(e) => setSupplyTarget(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Real Time Data Section */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-800 px-4 text-sm font-medium uppercase text-white">
                Real Time Data
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Return Air Temperature */}
            <div className="custom-grid">
              <div className="table-label mb-2">Return Air<br />Temp (°F):</div>
              <div className="text-4xl text-white">
                {coolingData ? formatTemperature(coolingData.returnAirTemp) : '--'}
              </div>
            </div>

            {/* Return Air Humidity */}
            <div className="custom-grid">
              <div className="table-label mb-2">Return Air<br />Humidity:</div>
              <div className="text-4xl text-white">
                {coolingData ? `${coolingData.returnAirHumidity.toFixed(0)}%` : '--'}
              </div>
            </div>

            {/* Supply Air Temperature */}
            <div className="custom-grid">
              <div className="table-label mb-2">Supply Air<br />Temp (°F):</div>
              <div className="text-4xl text-white">
                {coolingData ? formatTemperature(coolingData.supplyAirTemp) : '--'}
              </div>
            </div>

            {/* Supply Air Humidity */}
            <div className="custom-grid">
              <div className="table-label mb-2">Supply Air<br />Humidity:</div>
              <div className="text-4xl text-white">
                {coolingData ? `${coolingData.supplyAirHumidity.toFixed(0)}%` : '--'}
              </div>
            </div>

            {/* Internal Fan RPM */}
            <div className="custom-grid">
              <div className="table-label mb-2">Internal Fan (RPM)</div>
              <div className="text-4xl text-white">
                {coolingData ? coolingData.internalFanRpm : '--'}
              </div>
            </div>

            {/* External Fan RPM */}
            <div className="custom-grid">
              <div className="table-label mb-2">External Fan (RPM)</div>
              <div className="text-4xl text-white">
                {coolingData ? coolingData.externalFanRpm : '--'}
              </div>
            </div>

            {/* Condenser Motor RPM */}
            <div className="custom-grid">
              <div className="table-label mb-2">Condenser Motor (RPM)</div>
              <div className="text-4xl text-white">
                {coolingData ? coolingData.condenserMotorRpm : '--'}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-slate-400 italic mt-6 text-right">
            Last updated: {updatedTime}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
