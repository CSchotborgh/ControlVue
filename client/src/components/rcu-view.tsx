import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRealTimeData, formatTemperature } from "@/hooks/use-real-time-data";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function RCUView() {
  const { data: coolingData, isLoading } = useRealTimeData();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleAllSections = () => {
    const allSections = ['states', 'temperatures', 'motors'];
    const allExpanded = allSections.every(section => expandedSections.has(section));
    
    if (allExpanded) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(allSections));
    }
  };

  if (isLoading) {
    return (
      <Card className="edgerack-card mb-6">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-4 w-32 mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-24 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const allSections = ['states', 'temperatures', 'motors'];
  const allExpanded = allSections.every(section => expandedSections.has(section));

  return (
    <Card className="edgerack-card mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Cooling Unit Readings:</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAllSections}
            className="text-sm hover:text-slate-300 text-white"
          >
            {allExpanded ? '[ Collapse All ]' : '[ Expand All ]'}
          </Button>
        </div>

        {/* States Section */}
        <Card className="edgerack-card mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">States:</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('states')}
                className="text-sm hover:text-slate-300 text-white"
              >
                {expandedSections.has('states') ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            
            <div className={`collapsible-content ${expandedSections.has('states') ? 'expanded' : ''}`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                <div className={`custom-grid border-none rounded-full ${coolingData?.machineState ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className="table-label mb-2">Machine:</div>
                  <Badge className={`status-badge ${coolingData?.machineState ? 'on' : 'off'}`}>
                    {coolingData?.machineState ? 'ON' : 'OFF'}
                  </Badge>
                </div>

                <div className={`custom-grid border-none rounded-full ${coolingData?.selfCheckState ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className="table-label mb-2">Self-Check:</div>
                  <Badge className={`status-badge ${coolingData?.selfCheckState ? 'on' : 'off'}`}>
                    {coolingData?.selfCheckState ? 'ON' : 'OFF'}
                  </Badge>
                </div>

                <div className={`custom-grid border-none rounded-full ${coolingData?.coolingState ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className="table-label mb-2">Cooling:</div>
                  <Badge className={`status-badge ${coolingData?.coolingState ? 'on' : 'off'}`}>
                    {coolingData?.coolingState ? 'ON' : 'OFF'}
                  </Badge>
                </div>

                <div className={`custom-grid border-none rounded-full ${coolingData?.heatingState ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className="table-label mb-2">Heating:</div>
                  <Badge className={`status-badge ${coolingData?.heatingState ? 'on' : 'off'}`}>
                    {coolingData?.heatingState ? 'ON' : 'OFF'}
                  </Badge>
                </div>

                <div className={`custom-grid border-none rounded-full ${coolingData?.dehumidifierState ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className="table-label mb-2">Dehumidifier:</div>
                  <Badge className={`status-badge ${coolingData?.dehumidifierState ? 'on' : 'off'}`}>
                    {coolingData?.dehumidifierState ? 'ON' : 'OFF'}
                  </Badge>
                </div>

                <div className={`custom-grid border-none rounded-full ${coolingData?.humidifierState ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className="table-label mb-2">Humidifier:</div>
                  <Badge className={`status-badge ${coolingData?.humidifierState ? 'on' : 'off'}`}>
                    {coolingData?.humidifierState ? 'ON' : 'OFF'}
                  </Badge>
                </div>

                <div className={`custom-grid border-none rounded-full ${coolingData?.dryContactAlarmingState ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className="table-label mb-2">Dry Contact Alarming:</div>
                  <Badge className={`status-badge ${coolingData?.dryContactAlarmingState ? 'on' : 'off'}`}>
                    {coolingData?.dryContactAlarmingState ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperatures Section */}
        <Card className="edgerack-card mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Temperatures / Humidity:</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('temperatures')}
                className="text-sm hover:text-slate-300 text-white"
              >
                {expandedSections.has('temperatures') ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            
            <div className={`collapsible-content ${expandedSections.has('temperatures') ? 'expanded' : ''}`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div className="custom-grid">
                  <div className="table-label mb-2">Return Air<br />Temp (°F):</div>
                  <div className="text-4xl text-white">
                    {coolingData ? formatTemperature(coolingData.returnAirTemp) : '--'}
                  </div>
                </div>
                <div className="custom-grid">
                  <div className="table-label mb-2">Supply Air<br />Temp (°F):</div>
                  <div className="text-4xl text-white">
                    {coolingData ? formatTemperature(coolingData.supplyAirTemp) : '--'}
                  </div>
                </div>
                <div className="custom-grid">
                  <div className="table-label mb-2">Discharge<br />Temp (°F):</div>
                  <div className="text-4xl text-white">
                    {coolingData ? formatTemperature(coolingData.dischargeTemp) : '--'}
                  </div>
                </div>
                <div className="custom-grid">
                  <div className="table-label mb-2">Suction<br />Temp (°F):</div>
                  <div className="text-4xl text-white">
                    {coolingData ? formatTemperature(coolingData.suctionTemp) : '--'}
                  </div>
                </div>
                <div className="custom-grid">
                  <div className="table-label mb-2">Evaporator<br />Temp (°F):</div>
                  <div className="text-4xl text-white">
                    {coolingData ? formatTemperature(coolingData.evaporatorTemp) : '--'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motors Section */}
        <Card className="edgerack-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Motors / Electrical:</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('motors')}
                className="text-sm hover:text-slate-300 text-white"
              >
                {expandedSections.has('motors') ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            
            <div className={`collapsible-content ${expandedSections.has('motors') ? 'expanded' : ''}`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="custom-grid">
                  <div className="table-label mb-2">Internal Fan<br />(RPM)</div>
                  <div className="text-4xl text-white">
                    {coolingData ? coolingData.internalFanRpm : '--'}
                  </div>
                </div>
                <div className="custom-grid">
                  <div className="table-label mb-2">External Fan<br />(RPM)</div>
                  <div className="text-4xl text-white">
                    {coolingData ? coolingData.externalFanRpm : '--'}
                  </div>
                </div>
                <div className="custom-grid">
                  <div className="table-label mb-2">Condenser Motor<br />(RPM)</div>
                  <div className="text-4xl text-white">
                    {coolingData ? coolingData.condenserMotorRpm : '--'}
                  </div>
                </div>
                <div className="custom-grid">
                  <div className="table-label mb-2">AC Voltage<br />(V)</div>
                  <div className="text-4xl text-white">
                    {coolingData ? coolingData.acVoltage.toFixed(1) : '--'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
