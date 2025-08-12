/**
 * EDGERACK Cooling Unit Control System - Home Dashboard View
 * 
 * The main dashboard page providing comprehensive real-time monitoring and control
 * of the cooling unit system. This page displays key operational metrics, system
 * status, control settings, and network information in an industrial interface
 * designed for data center environments.
 */

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

/**
 * Cooling Unit Data Interface
 * 
 * Type definition for real-time cooling unit sensor data and operational states.
 * This interface matches the backend data structure and ensures type safety
 * throughout the dashboard display and monitoring components.
 */
interface CoolingUnitData {
  machineState: boolean;          // Main system power status
  selfCheckState: boolean;        // Self-diagnostic mode indicator
  coolingState: boolean;          // Cooling system operational status
  heatingState: boolean;          // Heating system operational status
  dehumidifierState: boolean;     // Dehumidifier operational status
  humidifierState: boolean;       // Humidifier operational status
  dryContactAlarmingState: boolean; // Alarm contact status
  returnAirTemp: number;          // Return air temperature (°C)
  returnAirHumidity: number;      // Return air humidity (%)
  supplyAirTemp: number;          // Supply air temperature (°C)
  supplyAirHumidity: number;      // Supply air humidity (%)
  internalFanRpm: number;         // Internal circulation fan speed
  externalFanRpm: number;         // External condenser fan speed
  condenserMotorRpm: number;      // Compressor motor speed
  dischargeTemp: number;          // Compressor discharge temperature (°C)
  suctionTemp: number;            // Compressor suction temperature (°C)
  evaporatorTemp: number;         // Evaporator coil temperature (°C)
  acVoltage: number;              // AC electrical supply voltage
}

export default function HomeView() {
  const [showInternalGrid, setShowInternalGrid] = useState(false);
  const [showCabinetSignals, setShowCabinetSignals] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [machineActive, setMachineActive] = useState(true);
  const [controllingSupplyAir, setControllingSupplyAir] = useState(true);
  const [returnAirTarget, setReturnAirTarget] = useState('80.6');
  const [supplyAirTarget, setSupplyAirTarget] = useState('66.2');
  
  // System status and alerts
  const [systemError] = useState('Cooling Unit Error: Check connection cable');
  const [cabinetStatus] = useState({
    alarmActivated: false,
    doorSensor: 'CLOSED',
    waterSensor: 'OK',
    smokeSensor: 'OK'
  });
  
  // Network and system information
  const [showNetworking, setShowNetworking] = useState(false);
  const [showSystem, setShowSystem] = useState(false);
  const [networkInfo] = useState({
    primaryLinkStatus: 'up',
    primaryIPv4: '192.168.222.184',
    primaryGateway: '192.168.222.244',
    primaryNetmask: '255.255.255.0',
    secondaryLinkStatus: 'up',
    secondaryIPv4: '10.36.9.235',
    secondaryGateway: '10.36.0.1',
    secondaryNetmask: '255.255.224.0',
    ntpSynchronized: true,
    ntpServer: '15.204.246.129'
  });
  
  const [systemInfo] = useState({
    cpuUsage: 90,
    loadAverages: '3.78 3.58 2.98',
    memoryUsage: '183MB / 998MB',
    storageUsage: '22MB / 4975MB',
    flashWearLevel: 10,
    uptime: '3 days, 23 hours, 38 minutes, 36 seconds',
    version: '1.0.1',
    build: '20250528-184708',
    release: 'stable'
  });

  const { data: coolingData, isLoading } = useQuery<CoolingUnitData>({
    queryKey: ['/api/cooling-unit/data'],
    refetchInterval: 1000,
  });

  const degreeSymbol = '°F';
  const lastUpdated = new Date().toLocaleString();

  // Convert temperatures from Celsius to Fahrenheit
  const convertTemp = (celsius: number) => ((celsius * 1.8) + 32).toFixed(1);

  const returnAirTempReal = coolingData ? convertTemp(coolingData.returnAirTemp) : '0.0';
  const returnAirHumReal = coolingData ? coolingData.returnAirHumidity.toFixed(0) : '0';
  const supplyAirTempReal = coolingData ? convertTemp(coolingData.supplyAirTemp) : '0.0';
  const supplyAirHumReal = coolingData ? (coolingData.supplyAirHumidity < 1000 ? coolingData.supplyAirHumidity.toFixed(0) : '-') : '0';
  const internalFanReal = coolingData ? coolingData.internalFanRpm.toString() : '0';
  const externalFanReal = coolingData ? coolingData.externalFanRpm.toString() : '0';
  const condenserMotorReal = coolingData ? coolingData.condenserMotorRpm.toString() : '0';
  const machineActiveReal = coolingData ? coolingData.machineState : false;
  const controlModeReal = true; // Default to supply air mode
  const returnAirTargetReal = convertTemp(24.0); // Default target temp
  const supplyAirTargetReal = convertTemp(19.0); // Default target temp

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
      {/* System Error Alert */}
      {systemError && (
        <div className="mb-6 p-4 bg-red-900/80 border border-red-600/50 rounded-lg" style={{
          background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.8) 0%, rgba(153, 27, 27, 0.6) 100%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <div className="flex items-center">
            <div className="text-red-200 font-semibold text-lg" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>
              {systemError}
            </div>
          </div>
        </div>
      )}
      {/* Cabinet Signals Section */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-[#060511] mt-[2px] mb-[2px]">
        <div className="my-6 mx-2">
          <div className="container flex flex-row">
            <div className="flex items-start text-2xl">Cabinet</div>
            <div className="flex gap-3 flex-1 justify-end">
              <button onClick={() => setShowCabinetSignals(!showCabinetSignals)}>
                <div className="text-2xl">
                  {showCabinetSignals ? '[ - ]' : '[ + ]'}
                </div>
              </button>
            </div>
          </div>
          
          {showCabinetSignals && (
            <div className="transition-all duration-500 ease-in-out">
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-11/12 h-px mt-6 bg-gray-200 border-0 dark:bg-gray-300" />
                <span className="absolute mt-6 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800 uppercase">
                  Signals from Cooling Unit
                </span>
              </div>

              <div className="grid grid-cols-2 m-2 sm:grid-cols-4 mx-auto gap-8 text-white w-full justify-around mt-8">
                <div className="custom-grid border-none">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Alarm Activated:
                  </div>
                  <div className="flex justify-center">
                    <Badge className={cabinetStatus.alarmActivated ? 'status-badge-off' : 'status-badge-on'}>
                      {cabinetStatus.alarmActivated ? 'YES' : 'No'}
                    </Badge>
                  </div>
                </div>
                
                <div className="custom-grid border-none">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Door Sensor:
                  </div>
                  <div className="flex justify-center">
                    <Badge className={cabinetStatus.doorSensor === 'CLOSED' ? 'status-badge-on' : 'status-badge-off'}>
                      {cabinetStatus.doorSensor}
                    </Badge>
                  </div>
                </div>
                
                <div className="custom-grid border-none">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Water Sensor:
                  </div>
                  <div className="flex justify-center">
                    <Badge className={cabinetStatus.waterSensor === 'OK' ? 'status-badge-on' : 'status-badge-off'}>
                      {cabinetStatus.waterSensor}
                    </Badge>
                  </div>
                </div>
                
                <div className="custom-grid border-none">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Smoke Sensor:
                  </div>
                  <div className="flex justify-center">
                    <Badge className={cabinetStatus.smokeSensor === 'OK' ? 'status-badge-on' : 'status-badge-off'}>
                      {cabinetStatus.smokeSensor}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Events Log within Cabinet Section */}
              <div className="mt-8 pt-6 border-t border-slate-600">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold">Events Log</div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">Log Entries: 1429</div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-600 text-white hover:bg-gray-700"
                    >
                      Refresh Log
                    </Button>
                  </div>
                </div>
                
                <div className="relative overflow-x-auto">
                  <table className="edgerack-table">
                    <thead>
                      <tr>
                        <th scope="col">Timestamp</th>
                        <th scope="col">Reporter</th>
                        <th scope="col">Target</th>
                        <th scope="col">Type</th>
                        <th scope="col">Event</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-medium bg-[#060511]">2025-08-05 12:20:53</td>
                        <td>Display</td>
                        <td className="bg-[#060511]">Display</td>
                        <td><Badge className="status-badge-blue">State</Badge></td>
                        <td>Screen Awakened from SCREENSAVER by MOTION!</td>
                      </tr>
                      <tr>
                        <td className="font-medium">2025-08-05 09:42:48</td>
                        <td>Website</td>
                        <td>RCU</td>
                        <td><Badge className="status-badge-yellow">Config</Badge></td>
                        <td>Modified ( control-mode-setting )</td>
                      </tr>
                      <tr>
                        <td className="font-medium">2025-08-05 09:40:02</td>
                        <td>Website</td>
                        <td>Controller</td>
                        <td><Badge className="status-badge-on">Auth</Badge></td>
                        <td>User admin log in SUCCESSFUL!</td>
                      </tr>
                      <tr>
                        <td className="font-medium">2025-08-01 13:10:38</td>
                        <td>RCU</td>
                        <td>RCU</td>
                        <td><Badge className="status-badge-on">State</Badge></td>
                        <td>MODBUS has CONNECTED</td>
                      </tr>
                      <tr>
                        <td className="font-medium">2025-08-01 13:10:38</td>
                        <td>RCU</td>
                        <td>RCU</td>
                        <td><Badge className="status-badge-on">State</Badge></td>
                        <td>Machine status set to ON</td>
                      </tr>
                      <tr>
                        <td className="font-medium">2025-07-21 15:44:42</td>
                        <td>Website</td>
                        <td>Controller</td>
                        <td><Badge className="status-badge-off">Auth</Badge></td>
                        <td>User admin log in FAILED! (Invalid user/pass)</td>
                      </tr>
                      <tr>
                        <td className="font-medium">2025-07-21 12:10:41</td>
                        <td>RCU</td>
                        <td>Cabinet</td>
                        <td><Badge className="status-badge-off">Alarm</Badge></td>
                        <td>Door Open Alarm</td>
                      </tr>
                      <tr>
                        <td className="font-medium">2025-07-21 11:14:53</td>
                        <td>Display</td>
                        <td>RCU</td>
                        <td><Badge className="status-badge-blue">State</Badge></td>
                        <td>Request to modify Supply Air Target</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Top level container for Cooling Unit section */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-[#060511]">
        <div className="my-6 mx-2">
          <div className="container flex flex-row">
            <div className="flex items-start text-2xl">Cooling Unit</div>
            <div className="flex gap-3 flex-1 justify-end">
              <button onClick={() => setShowInternalGrid(!showInternalGrid)}>
                <div className="text-2xl">
                  {showInternalGrid ? '[ - ]' : '[ + ]'}
                </div>
              </button>
            </div>
          </div>
          
          {showInternalGrid && (
            <div className="flex justify-center uppercase text-xs italic m-2">
              Last updated: <div>&nbsp; {lastUpdated}</div>
            </div>
          )}
          
          {showInternalGrid && (
            <div className="transition-all duration-500 ease-in-out">
              {/* Horizontal separator for Controls grids */}
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-11/12 h-px mt-6 bg-gray-200 border-0 dark:bg-gray-300" />
                <span className="absolute mt-6 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800 uppercase">
                  Controls
                </span>
              </div>

              {/* Control grids */}
              {!loggedIn && (
                <div className="flex justify-center text-sm italic m-2">
                  Log in to modify controls
                </div>
              )}
              
              <div className="grid grid-cols-2 m-2 sm:grid-cols-3 mx-auto gap-8 text-white w-full justify-around">
                <div className={`custom-grid border-none ${loggedIn ? 'grid-rows-2' : ''}`}>
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Machine:
                  </div>
                  <div className="flex justify-center">
                    <Badge className={machineActiveReal ? 'status-badge-on' : 'status-badge-off'}>
                      {machineActiveReal ? 'ON' : 'OFF'}
                    </Badge>
                  </div>
                  {loggedIn && (
                    <div className="mt-2">
                      <Switch checked={machineActive} onCheckedChange={setMachineActive} />
                    </div>
                  )}
                </div>
                
                <div className={`custom-grid border-none ${loggedIn ? 'grid-rows-2' : ''}`}>
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Control Mode:
                  </div>
                  <div className="flex justify-center">
                    <Badge className={controlModeReal ? 'status-badge-on' : 'status-badge-off'}>
                      {controlModeReal ? 'Supply Air' : 'Return Air'}
                    </Badge>
                  </div>
                  {loggedIn && (
                    <div className="mt-2">
                      <Switch checked={controllingSupplyAir} onCheckedChange={setControllingSupplyAir} />
                    </div>
                  )}
                </div>
                
                <div className={`custom-grid border-none ${loggedIn ? 'grid-rows-2' : ''}`}>
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    {controlModeReal ? `Supply Air Target (${degreeSymbol}):` : `Return Air Target (${degreeSymbol}):`}
                  </div>
                  <div className="text-4xl">
                    {controlModeReal ? supplyAirTargetReal : returnAirTargetReal}
                  </div>
                  {loggedIn && (
                    <div className="mt-2">
                      <Input
                        value={controlModeReal ? supplyAirTarget : returnAirTarget}
                        onChange={(e) => controlModeReal ? setSupplyAirTarget(e.target.value) : setReturnAirTarget(e.target.value)}
                        placeholder="Value"
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* HR separator for Real Time Data section*/}
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-11/12 h-px mt-6 bg-gray-200 border-0 dark:bg-gray-300" />
                <span className="absolute mt-6 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800 uppercase">
                  Real Time Data
                </span>
              </div>

              {/* Real time data grids */}
              <div className="grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full">
                <div className="custom-grid">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Return Air<br />Temp ({degreeSymbol}):
                  </div>
                  <div className="text-4xl grid-rows-1">{returnAirTempReal}</div>
                </div>
                
                <div className="custom-grid">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Return Air<br />Humidity:
                  </div>
                  <div className="text-4xl">{returnAirHumReal}%</div>
                </div>
                
                <div className="custom-grid">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Supply Air<br />Temp ({degreeSymbol}):
                  </div>
                  <div className="text-4xl">{supplyAirTempReal}</div>
                </div>
                
                <div className="custom-grid">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Supply Air<br />Humidity:
                  </div>
                  <div className="text-4xl">{supplyAirHumReal}%</div>
                </div>
                
                <div className="custom-grid">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Internal Fan (RPM)
                  </div>
                  <div className="text-4xl">{internalFanReal}</div>
                </div>
                
                <div className="custom-grid">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    External Fan (RPM)
                  </div>
                  <div className="text-4xl">{externalFanReal}</div>
                </div>
                
                <div className="custom-grid">
                  <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                    Condenser Motor (RPM)
                  </div>
                  <div className="text-4xl">{condenserMotorReal}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Networking Section */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-[#060511]">
        <div className="my-6 mx-2">
          <div className="container flex flex-row">
            <div className="flex items-start text-2xl">Networking</div>
            <div className="flex gap-3 flex-1 justify-end">
              <button onClick={() => setShowNetworking(!showNetworking)}>
                <div className="text-2xl">
                  {showNetworking ? '[ - ]' : '[ + ]'}
                </div>
              </button>
            </div>
          </div>
          
          {showNetworking && (
            <div className="transition-all duration-500 ease-in-out">
              <div className="system-info-grid">
                {/* Primary Network */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-lg font-semibold">Primary Link Status:</div>
                    <Badge className={networkInfo.primaryLinkStatus === 'up' ? 'status-badge-on' : 'status-badge-off'}>
                      {networkInfo.primaryLinkStatus}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="network-status-item">
                      <span className="network-status-label">Primary IPv4 Address:</span>
                      <span className="network-status-value">{networkInfo.primaryIPv4}</span>
                    </div>
                    <div className="network-status-item">
                      <span className="network-status-label">Primary Gateway:</span>
                      <span className="network-status-value">{networkInfo.primaryGateway}</span>
                    </div>
                    <div className="network-status-item">
                      <span className="network-status-label">Primary Netmask:</span>
                      <span className="network-status-value">{networkInfo.primaryNetmask}</span>
                    </div>
                  </div>
                </div>
                
                {/* Secondary Network */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-lg font-semibold">Secondary Link Status:</div>
                    <Badge className={networkInfo.secondaryLinkStatus === 'up' ? 'status-badge-on' : 'status-badge-off'}>
                      {networkInfo.secondaryLinkStatus}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="network-status-item">
                      <span className="network-status-label">Secondary IPv4 Address:</span>
                      <span className="network-status-value">{networkInfo.secondaryIPv4}</span>
                    </div>
                    <div className="network-status-item">
                      <span className="network-status-label">Secondary Gateway:</span>
                      <span className="network-status-value">{networkInfo.secondaryGateway}</span>
                    </div>
                    <div className="network-status-item">
                      <span className="network-status-label">Secondary Netmask:</span>
                      <span className="network-status-value">{networkInfo.secondaryNetmask}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* NTP Information */}
              <div className="mt-6 pt-6 border-t border-slate-600">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-lg font-semibold">NTP Synchronized:</div>
                  <Badge className={networkInfo.ntpSynchronized ? 'status-badge-on' : 'status-badge-off'}>
                    {networkInfo.ntpSynchronized ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="network-status-item">
                  <span className="network-status-label">NTP Synchronized Server:</span>
                  <span className="network-status-value">{networkInfo.ntpServer}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* System Section */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-[#060511]">
        <div className="my-6 mx-2">
          <div className="container flex flex-row">
            <div className="flex items-start text-2xl">System</div>
            <div className="flex gap-3 flex-1 justify-end">
              <button onClick={() => setShowSystem(!showSystem)}>
                <div className="text-2xl">
                  {showSystem ? '[ - ]' : '[ + ]'}
                </div>
              </button>
            </div>
          </div>
          
          {showSystem && (
            <div className="transition-all duration-500 ease-in-out">
              <div className="system-info-grid">
                {/* System Performance */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-lg font-semibold">CPU Usage:</div>
                    <Badge className={systemInfo.cpuUsage > 80 ? 'status-badge-off' : systemInfo.cpuUsage > 60 ? 'status-badge-yellow' : 'status-badge-on'}>
                      {systemInfo.cpuUsage}%
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="network-status-item">
                      <span className="network-status-label">Load Averages:</span>
                      <span className="network-status-value">{systemInfo.loadAverages}</span>
                    </div>
                    <div className="network-status-item">
                      <span className="network-status-label">Memory Usage:</span>
                      <span className="network-status-value">{systemInfo.memoryUsage}</span>
                    </div>
                    <div className="network-status-item">
                      <span className="network-status-label">Storage Usage:</span>
                      <span className="network-status-value">{systemInfo.storageUsage}</span>
                    </div>
                  </div>
                </div>
                
                {/* Flash Wear & System Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-lg font-semibold">Flash Wear Level:</div>
                    <Badge className={systemInfo.flashWearLevel <= 10 ? 'status-badge-on' : systemInfo.flashWearLevel <= 50 ? 'status-badge-yellow' : 'status-badge-off'}>
                      {systemInfo.flashWearLevel}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="network-status-item">
                      <span className="network-status-label">Wear Level Description:</span>
                      <span className="network-status-value">New (&lt;=10%)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* System Details */}
              <div className="system-uptime-display">
                <div className="system-uptime-text">
                  [ System Uptime: {systemInfo.uptime} ]
                </div>
                <div className="system-version-text">
                  [ Version: {systemInfo.version} - Build: {systemInfo.build} - Release: {systemInfo.release} ]
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Temporary login simulation */}
      <div className="mt-8 flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setLoggedIn(!loggedIn)}
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          Toggle Log In State
        </Button>
        <div className="text-white">
          Status: &nbsp;
          <span className={loggedIn ? 'text-green-400 font-semibold' : 'text-gray-400'}>
            {loggedIn ? 'Logged In' : 'Logged Out'}
          </span>
        </div>
      </div>
    </main>
  );
}