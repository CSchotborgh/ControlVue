import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

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
  acVoltage: number;
}

export default function HomeView() {
  const [showInternalGrid, setShowInternalGrid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [machineActive, setMachineActive] = useState(true);
  const [controllingSupplyAir, setControllingSupplyAir] = useState(true);
  const [returnAirTarget, setReturnAirTarget] = useState('80.6');
  const [supplyAirTarget, setSupplyAirTarget] = useState('66.2');

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
      {/* Top level container for Cooling Unit section */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
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