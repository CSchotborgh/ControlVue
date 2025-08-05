import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CoolingUnitData {
  machineState: boolean;
  selfCheckState: boolean;
  coolingState: boolean;
  heatingState: boolean;
  dehumidifierState: boolean;
  humidifierState: boolean;
  dryContactAlarmingState: boolean;
  returnAirTemp: number;
  returnAirHumidity: number;
  supplyAirTemp: number;
  supplyAirHumidity: number;
  internalFanRpm: number;
  externalFanRpm: number;
  condenserMotorRpm: number;
  dischargeTemp: number;
  suctionTemp: number;
  evaporatorTemp: number;
  condenserTemp: number;
  outdoorTemp: number;
  acVoltage: number;
  compressorHeaterCurrent: number;
  eevPosition: number;
  highPressure: number;
  lowPressure: number;
}

export default function CoolingView() {
  const [showStates, setShowStates] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [showTempsHumidity, setShowTempsHumidity] = useState(false);
  const [showFansMotors, setShowFansMotors] = useState(false);
  const [showOtherMetrics, setShowOtherMetrics] = useState(false);
  const [showAlarmLogs, setShowAlarmLogs] = useState(false);
  const [triggerExpandAll, setTriggerExpandAll] = useState(false);

  const { data: coolingData, isLoading } = useQuery<CoolingUnitData>({
    queryKey: ['/api/cooling-unit/data'],
    refetchInterval: 1000,
  });

  const toggleExpansion = () => {
    const newExpandState = !triggerExpandAll;
    setShowStates(newExpandState);
    setShowControl(newExpandState);
    setShowTempsHumidity(newExpandState);
    setShowFansMotors(newExpandState);
    setShowOtherMetrics(newExpandState);
    setShowAlarmLogs(newExpandState);
    setTriggerExpandAll(newExpandState);
  };

  // Real data from your EDGERACK system
  const lastUpdated = "2025-08-05 13:38:47";
  const modbusStatus = "Connected";

  // Real data from your EDGERACK system
  const realData = {
    machine: "ON",
    selfCheck: "OFF", 
    cooling: "ON",
    heating: "OFF",
    dehumidifier: "OFF",
    humidifier: "OFF",
    alarmActive: "NO",
    controlMode: "Supply Air",
    supplyAirTarget: "66.9",
    returnAirTemp: "68",
    returnAirHumidity: "28%",
    supplyAirTemp: "61.3", 
    supplyAirHumidity: "-%",
    dischargeTemp: "-",
    suctionTemp: "67.3",
    evaporatorTemp: "36.9",
    condenserTemp: "95.2",
    outdoorTemp: "-",
    internalFanRpm: "2450",
    externalFanRpm: "5130", 
    condenserMotorRpm: "1891",
    acVoltage: "206.3",
    compressorHeaterCurrent: "0",
    eevPosition: "330",
    highPressure: "0", 
    lowPressure: "10.2",
    alarmEntries: "71"
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 text-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading cooling unit data...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      {/* Header Section */}
      <div className="flex flex-row mb-6">
        <div className="flex flex-1 justify-start">
          <h1 className="text-2xl font-semibold">Cooling Unit Readings:</h1>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={toggleExpansion}
            className="text-lg text-blue-400 hover:text-blue-300 transition-colors"
          >
            {triggerExpandAll ? '[ Collapse All ]' : '[ Expand All ]'}
          </button>
        </div>
      </div>
      {/* Status and Last Updated */}
      <div className="mb-6 text-center space-y-2">
        <div className="text-lg">
          Last updated: <span className="edgerack-monospace text-green-400">{lastUpdated}</span>
        </div>
        <div className="text-lg">
          MODBUS: <Badge className="status-badge-on">{modbusStatus}</Badge>
        </div>
      </div>
      {/* States Section */}
      <div className="cooling-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-light">States:</div>
          <div className="flex gap-3 flex-1 justify-end font-normal">
            <button onClick={() => setShowStates(!showStates)}>
              <div className="text-xl">{showStates ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showStates && (
          <div className="cooling-content">
            <div className="cooling-metrics-grid">
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Machine:</div>
                <div className="cooling-metric-value">
                  <Badge className={realData.machine === 'ON' ? 'status-badge-on' : 'status-badge-off'}>
                    {realData.machine}
                  </Badge>
                </div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Self-Check:</div>
                <div className="cooling-metric-value">
                  <Badge className={realData.selfCheck === 'ON' ? 'status-badge-on' : 'status-badge-off'}>
                    {realData.selfCheck}
                  </Badge>
                </div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Cooling:</div>
                <div className="cooling-metric-value">
                  <Badge className={realData.cooling === 'ON' ? 'status-badge-on' : 'status-badge-off'}>
                    {realData.cooling}
                  </Badge>
                </div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Heating:</div>
                <div className="cooling-metric-value">
                  <Badge className={realData.heating === 'ON' ? 'status-badge-on' : 'status-badge-off'}>
                    {realData.heating}
                  </Badge>
                </div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Dehumidifier:</div>
                <div className="cooling-metric-value">
                  <Badge className={realData.dehumidifier === 'ON' ? 'status-badge-on' : 'status-badge-off'}>
                    {realData.dehumidifier}
                  </Badge>
                </div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Humidifier:</div>
                <div className="cooling-metric-value">
                  <Badge className={realData.humidifier === 'ON' ? 'status-badge-on' : 'status-badge-off'}>
                    {realData.humidifier}
                  </Badge>
                </div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Alarm Active:</div>
                <div className="cooling-metric-value">
                  <Badge className={realData.alarmActive === 'YES' ? 'status-badge-off' : 'status-badge-on'}>
                    {realData.alarmActive}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Control Section */}
      <div className="cooling-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">Control:</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowControl(!showControl)}>
              <div className="text-xl">{showControl ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showControl && (
          <div className="cooling-content">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">Machine:</div>
                <Badge className={realData.machine === 'ON' ? 'status-badge-on' : 'status-badge-off'}>
                  {realData.machine}
                </Badge>
                <button className="text-sm text-blue-400 hover:text-blue-300 lowercase">
                  {realData.machine.toLowerCase()}
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="text-lg font-semibold">Control Mode:</div>
                  <Badge className="status-badge-blue">{realData.controlMode}</Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-lg font-semibold">Supply Air Target (°F):</div>
                  <span className="edgerack-monospace text-2xl text-green-400">{realData.supplyAirTarget}</span>
                  <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400/10">
                    Modify
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Temperatures / Humidity Section */}
      <div className="cooling-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">Temperatures / Humidity:</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowTempsHumidity(!showTempsHumidity)}>
              <div className="text-xl">{showTempsHumidity ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showTempsHumidity && (
          <div className="cooling-content">
            <div className="cooling-metrics-grid">
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Return Air<br />Temp (°F):</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.returnAirTemp}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Return Air<br />Humidity:</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.returnAirHumidity}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Supply Air<br />Temp (°F):</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.supplyAirTemp}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Supply Air<br />Humidity:</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.supplyAirHumidity}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Discharge<br />Temp (°F):</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.dischargeTemp}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Suction<br />Temp (°F):</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.suctionTemp}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Evaporator<br />Temp (°F):</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.evaporatorTemp}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Condenser<br />Temp (°F):</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.condenserTemp}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Outdoor<br />Temp (°F):</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.outdoorTemp}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Fans / Motors Section */}
      <div className="cooling-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">Fans / Motors:</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowFansMotors(!showFansMotors)}>
              <div className="text-xl">{showFansMotors ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showFansMotors && (
          <div className="cooling-content">
            <div className="cooling-metrics-grid">
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Internal Fan (RPM)</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.internalFanRpm}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">External Fan (RPM)</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.externalFanRpm}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Condenser Motor (RPM)</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.condenserMotorRpm}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Other Metrics Section */}
      <div className="cooling-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">Other Metrics:</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowOtherMetrics(!showOtherMetrics)}>
              <div className="text-xl">{showOtherMetrics ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showOtherMetrics && (
          <div className="cooling-content">
            <div className="cooling-metrics-grid">
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">AC Voltage (VAC)</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.acVoltage}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Compressor Heater<br />Current (A)</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.compressorHeaterCurrent}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">EEV Position</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.eevPosition}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">High Pressure (Bar)</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.highPressure}</div>
              </div>
              
              <div className="cooling-metric-item">
                <div className="cooling-metric-label">Low Pressure (Bar)</div>
                <div className="cooling-metric-value edgerack-monospace">{realData.lowPressure}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Alarm Logs Section */}
      <div className="cooling-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">Alarm Logs:</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowAlarmLogs(!showAlarmLogs)}>
              <div className="text-xl">{showAlarmLogs ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showAlarmLogs && (
          <div className="cooling-content">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-400">Alarm Entries: {realData.alarmEntries}</div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                Refresh Log
              </Button>
            </div>
            
            <div className="relative overflow-x-auto">
              <table className="edgerack-table">
                <thead>
                  <tr>
                    <th scope="col">Start Timestamp</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">2025-07-21 12:10:41</td>
                    <td>Door Open Alarm</td>
                    <td>35 sec</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2025-07-21 12:00:09</td>
                    <td>Door Open Alarm</td>
                    <td>25 sec</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2025-07-21 11:37:15</td>
                    <td>Door Open Alarm</td>
                    <td>20 min 18 sec</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2025-07-21 11:18:31</td>
                    <td>Door Open Alarm</td>
                    <td>56 sec</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2025-07-21 10:57:02</td>
                    <td>Door Open Alarm</td>
                    <td>17 min 14 sec</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2025-04-17 20:23:32</td>
                    <td>Low Return Air Humidity Alarm</td>
                    <td>60 hr 45 min 4 sec</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2025-02-10 17:06:14</td>
                    <td>Inverter Compressor Fault</td>
                    <td>5 min 2 sec</td>
                  </tr>
                  <tr>
                    <td className="font-medium">2025-02-07 11:10:49</td>
                    <td>Inverter Compressor Fault</td>
                    <td>5 min 1 sec</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}