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
  acVoltage: number;
}

export default function RCUView() {
  const [showInternalGridStates, setShowInternalGridStates] = useState(false);
  const [showInternalGridTemps, setShowInternalGridTemps] = useState(false);
  const [showInternalGridMotors, setShowInternalGridMotors] = useState(false);
  const [triggerExpandAll, setTriggerExpandAll] = useState(false);

  const { data: coolingData, isLoading } = useQuery<CoolingUnitData>({
    queryKey: ['/api/cooling-unit/data'],
    refetchInterval: 1000,
  });

  const toggleExpansion = () => {
    if (triggerExpandAll) {
      setShowInternalGridMotors(false);
      setShowInternalGridStates(false);
      setShowInternalGridTemps(false);
    } else {
      setShowInternalGridMotors(true);
      setShowInternalGridStates(true);
      setShowInternalGridTemps(true);
    }
    setTriggerExpandAll(!triggerExpandAll);
  };

  const degreeSymbol = '°F';
  const lastUpdated = new Date().toLocaleString();

  // Convert temperatures from Celsius to Fahrenheit
  const convertTemp = (celsius: number) => ((celsius * 1.8) + 32).toFixed(1);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 text-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading cooling unit data...</div>
        </div>
      </main>
    );
  }

  const returnAirTempReal = coolingData ? convertTemp(coolingData.returnAirTemp) : '0.0';
  const returnAirHumReal = coolingData ? coolingData.returnAirHumidity.toFixed(0) : '0';
  const supplyAirTempReal = coolingData ? convertTemp(coolingData.supplyAirTemp) : '0.0';
  const supplyAirHumReal = coolingData ? (coolingData.supplyAirHumidity < 1000 ? coolingData.supplyAirHumidity.toFixed(0) : '-') : '0';
  const internalFanReal = coolingData ? coolingData.internalFanRpm.toString() : '0';
  const externalFanReal = coolingData ? coolingData.externalFanRpm.toString() : '0';
  const condenserMotorReal = coolingData ? coolingData.condenserMotorRpm.toString() : '0';
  const dischargeTempReal = coolingData ? (coolingData.dischargeTemp < 500 ? convertTemp(coolingData.dischargeTemp) : '-') : '0.0';
  const suctionTempReal = coolingData ? convertTemp(coolingData.suctionTemp) : '0.0';
  const evapTempReal = coolingData ? convertTemp(coolingData.evaporatorTemp) : '0.0';
  const acVoltageReal = coolingData ? coolingData.acVoltage.toFixed(1) : '0.0';

  const machineActiveReal = coolingData?.machineState || false;
  const selfCheckActiveReal = coolingData?.selfCheckState || false;
  const coolingActiveReal = coolingData?.coolingState || false;
  const heatingActiveReal = coolingData?.heatingState || false;
  const dehumidifierActiveReal = coolingData?.dehumidifierState || false;
  const humidifierActiveReal = coolingData?.humidifierState || false;
  const dryContactAlarmingActiveReal = coolingData?.dryContactAlarmingState || false;

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      {/* Expand All Button */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={toggleExpansion}
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          {triggerExpandAll ? 'Collapse All' : 'Expand All'}
        </Button>
      </div>
      
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Cooling Unit Readings:</h1>
      
      {/* Last updated section */}
      <div className="flex justify-center uppercase text-xs italic mt-2">
        Last updated: <div>&nbsp; {lastUpdated}</div>
      </div>

      {/* States Grid */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
        <div className="my-6 mx-2">
          <div className="container flex flex-row">
            <div className="flex items-start">States:</div>
            <div className="flex gap-3 flex-1 justify-end">
              <button onClick={() => setShowInternalGridStates(!showInternalGridStates)}>
                <div>{showInternalGridStates ? '[ - ]' : '[ + ]'}</div>
              </button>
            </div>
          </div>
          
          {showInternalGridStates && (
            <div className="transition-all duration-500 ease-in-out grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 mx-auto p-2 gap-8 text-white w-full">
              <div className={`custom-grid border-none dark:rounded-full dark:bg-gray-600 ${machineActiveReal ? 'dark:bg-green-600' : ''}`}>
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Machine:</div>
                <div className="flex justify-center">
                  <Badge className={machineActiveReal ? 'status-badge-on' : 'status-badge-off'}>
                    {machineActiveReal ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
              
              <div className={`custom-grid border-none dark:rounded-full dark:bg-gray-600 ${selfCheckActiveReal ? 'dark:bg-blue-500' : ''}`}>
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Self-Check:</div>
                <div className="flex justify-center">
                  <Badge className={selfCheckActiveReal ? 'status-badge-blue' : 'status-badge-off'}>
                    {selfCheckActiveReal ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
              
              <div className={`custom-grid border-none dark:rounded-full dark:bg-gray-600 ${coolingActiveReal ? 'dark:bg-blue-500' : ''}`}>
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Cooling:</div>
                <div className="flex justify-center">
                  <Badge className={coolingActiveReal ? 'status-badge-on' : 'status-badge-off'}>
                    {coolingActiveReal ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
              
              <div className={`custom-grid border-none dark:rounded-full dark:bg-gray-600 ${heatingActiveReal ? 'dark:bg-red-500' : ''}`}>
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Heating:</div>
                <div className="flex justify-center">
                  <Badge className={heatingActiveReal ? 'status-badge-on' : 'status-badge-off'}>
                    {heatingActiveReal ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
              
              <div className={`custom-grid border-none dark:rounded-full dark:bg-gray-600 ${dehumidifierActiveReal ? 'dark:bg-purple-500' : ''}`}>
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Dehumidifier:</div>
                <div className="flex justify-center">
                  <Badge className={dehumidifierActiveReal ? 'status-badge-purple' : 'status-badge-off'}>
                    {dehumidifierActiveReal ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
              
              <div className={`custom-grid border-none dark:rounded-full dark:bg-gray-600 ${humidifierActiveReal ? 'dark:bg-purple-500' : ''}`}>
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Humidifier:</div>
                <div className="flex justify-center">
                  <Badge className={humidifierActiveReal ? 'status-badge-purple' : 'status-badge-off'}>
                    {humidifierActiveReal ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
              
              <div className={`custom-grid border-none dark:rounded-full dark:bg-gray-600 ${dryContactAlarmingActiveReal ? 'dark:bg-purple-500' : ''}`}>
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Dry Contact Alarming:</div>
                <div className="flex justify-center">
                  <Badge className={dryContactAlarmingActiveReal ? 'status-badge-purple' : 'status-badge-off'}>
                    {dryContactAlarmingActiveReal ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Temperature Grid */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
        <div className="my-6 mx-2">
          <div className="container flex flex-row">
            <div className="flex items-start">Temperatures / Humidity:</div>
            <div className="flex gap-3 flex-1 justify-end">
              <button onClick={() => setShowInternalGridTemps(!showInternalGridTemps)}>
                <div>{showInternalGridTemps ? '[ - ]' : '[ + ]'}</div>
              </button>
            </div>
          </div>
          
          {showInternalGridTemps && (
            <div className="transition-all duration-500 ease-in-out grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full">
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Return Air<br />Temp ({degreeSymbol}):
                </div>
                <div className="text-4xl">{returnAirTempReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Supply Air<br />Temp ({degreeSymbol}):
                </div>
                <div className="text-4xl">{supplyAirTempReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Discharge<br />Temp ({degreeSymbol}):
                </div>
                <div className="text-4xl">{dischargeTempReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Suction<br />Temp ({degreeSymbol}):
                </div>
                <div className="text-4xl">{suctionTempReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Evaporator<br />Temp ({degreeSymbol}):
                </div>
                <div className="text-4xl">{evapTempReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Return Air<br />Humidity:
                </div>
                <div className="text-4xl">{returnAirHumReal}%</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Supply Air<br />Humidity:
                </div>
                <div className="text-4xl">{supplyAirHumReal}%</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Motors Grid */}
      <div className="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
        <div className="my-6 mx-2">
          <div className="container flex flex-row">
            <div className="flex items-start">Motors / Electrical:</div>
            <div className="flex gap-3 flex-1 justify-end">
              <button onClick={() => setShowInternalGridMotors(!showInternalGridMotors)}>
                <div>{showInternalGridMotors ? '[ - ]' : '[ + ]'}</div>
              </button>
            </div>
          </div>
          
          {showInternalGridMotors && (
            <div className="transition-all duration-500 ease-in-out grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 mx-auto p-2 gap-8 text-white w-full">
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Internal Fan<br />(RPM):
                </div>
                <div className="text-4xl">{internalFanReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  External Fan<br />(RPM):
                </div>
                <div className="text-4xl">{externalFanReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  Condenser Motor<br />(RPM):
                </div>
                <div className="text-4xl">{condenserMotorReal}</div>
              </div>
              
              <div className="custom-grid">
                <div className="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">
                  AC Voltage<br />(V):
                </div>
                <div className="text-4xl">{acVoltageReal}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}