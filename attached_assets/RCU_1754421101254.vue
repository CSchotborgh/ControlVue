<script setup>
import { FwbBadge } from 'flowbite-vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

let showInternalGridStates = ref(null);
let showInternalGridTemps = ref(null);
let showInternalGridMotors = ref(null);
let showInternalGridOther = ref(null);
let triggerExpandAll = ref(false);

const toggleExpansion = () => {
    if (triggerExpandAll) {
        showInternalGridMotors.value = false;
        showInternalGridStates.value = false;
        showInternalGridOther.value = false;
        showInternalGridTemps.value = false;
    } else {
        showInternalGridMotors.value = true;
        showInternalGridStates.value = true;
        showInternalGridOther.value = true;
        showInternalGridTemps.value = true;
    }

    triggerExpandAll = !triggerExpandAll;
};


const degreeSymbol = ref('°F');

let showInternalGrid = ref(null);
let loggedIn = ref(false);

// States
let machineActiveReal = ref(false);
let selfCheckActiveReal = ref(false);
let coolingActiveReal = ref(false);
let heatingActiveReal = ref(false);
let dehumidifierActiveReal = ref(false);
let humidifierActiveReal = ref(false);
let dryContactAlarmingActiveReal = ref(false);

let controllingSupplyAir = ref(true);

// Variables for real time view
let returnAirTempReal = ref('0.0');
let returnAirHumReal = ref('0');
let supplyAirTempReal = ref('0.0');
let supplyAirHumReal = ref('0');
let internalFanReal = ref('0');
let externalFanReal = ref('0');
let condenserMotorReal = ref('0');
let controlModeReal = ref('0')
let returnAirTargetReal = ref('0.0');
let supplyAirTargetReal = ref('0.0');
let dischargeTempReal = ref('0.0');
let suctionTempReal = ref('0.0');
let evapTempReal = ref('0.0');
let condTempReal = ref('0.0');
let outdoorTempReal = ref('0.0');

let acVoltageReal = ref('0.0');
let compCurrentReal = ref('0.00');
let eevPositionReal = ref('0');

let data = [];

const fetchData = async () => {
    try {
        const response = await axios.get('api/all'); // Adjust your API endpoint
        if (response.status === 200) {
            data = response.data;

            // parsing retrieved json data
            for (let i = 0; i < data.length; i++){
                let obj = data[i];
                returnAirTargetReal.value = parseFloat(((data[i].returnAirTargetTemp / 10) * 1.8 + 32).toFixed(1));
                returnAirTempReal.value = parseFloat(((data[i].returnAirTemperature / 10) * 1.8 + 32).toFixed(1));
                returnAirHumReal.value = parseFloat((data[i].returnAirHumidity / 10).toFixed(0));
                supplyAirTargetReal.value = parseFloat(((data[i].supplyAirTargetTemp / 10) * 1.8 + 32).toFixed(1));
                supplyAirTempReal.value = parseFloat(((data[i].supplyAirTemperature / 10) * 1.8 + 32).toFixed(1));
                supplyAirHumReal.value = data[i].supplyAirHumidity < 1000 ? parseFloat((data[i].supplyAirHumidity / 10).toFixed(0)) : '-';
                internalFanReal.value = parseInt((data[i].internalFanSpeed));
                externalFanReal.value = parseInt((data[i].externalFanSpeed));
                condenserMotorReal.value = parseInt((data[i].inverterCompressorSpeed));
                machineActiveReal.value = data[i].machine_active ? true : false;
                controlModeReal.value = data[i].controlModeSetting ? false : true;
                dischargeTempReal.value = data[i].dischargeTemperature < 500 ? parseFloat(((data[i].dischargeTemperature / 10) * 1.8 + 32).toFixed(1)) : '-';
                suctionTempReal.value = parseFloat(((data[i].suctionTemperature / 10) * 1.8 + 32).toFixed(1));
                evapTempReal.value = parseFloat(((data[i].evaporatorTemperature / 10) * 1.8 + 32).toFixed(1));
                condTempReal.value = parseFloat(((data[i].condenserTemperature / 10) * 1.8 + 32).toFixed(1));
                outdoorTempReal.value = data[i].outdoorTemperature < 1000 ? parseFloat(((data[i].outdoorTemperature / 10) * 1.8 + 32).toFixed(1)) : '-';

                acVoltageReal.value = parseFloat((data[i].acPowerVoltage / 10).toFixed(1));
                compCurrentReal.value = parseFloat((data[i].compressorHeaterCurrent / 100).toFixed(2));
                eevPositionReal.value = parseInt(data[i].eevPosition);

                selfCheckActiveReal.value = data[i].selfcheck_active ? true : false;
                coolingActiveReal.value = data[i].cooling_active ? true : false;
                heatingActiveReal.value = data[i].heating_active ? true : false;
                dehumidifierActiveReal.value = data[i].dehumidification_active ? true : false;
                humidifierActiveReal.value = data[i].humidifier_active ? true : false;
                dryContactAlarmingActiveReal.value = data[i].drycontactalarming_active ? true : false;
            }

        } else {
            console.error('Error fetching data:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
    setInterval(fetchData, 1000); // Fetch data every second
});

</script>

<template>
    <main class="container text-white">
        <!-- Header and Expansion/Collapse Control -->
        <div class="flex flex-row">
            <div class="flex flex-1 justify-start">
                <h1 class="mt-6">Cooling Unit Readings:</h1>
            </div>
            <div class="flex justify-end mt-6">
                <button @click="toggleExpansion">
                    <div v-if="triggerExpandAll">[ Collapse All ]</div>
                    <div v-else>[ Expand All ]</div>
                </button>
            </div>
        </div>
        
        <!-- Last updated section -->
        <div class="flex justify-center uppercase text-xs italic mt-2">Last updated:<div id="updatedTime">&nbsp; 2024-03-08 12:41:05 PM</div></div>   

        <!-- States Grid -->
        <div class="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
            <div class="my-6 mx-2">
                <div class="container flex flex-row">
                    <div class="flex items-start">States:</div>
                    <div class="flex gap-3 flex-1 justify-end">
                        <button @click="showInternalGridStates = !showInternalGridStates">
                            <div v-if="showInternalGridStates">[ - ]</div>
                            <div v-else>[ + ]</div>
                        </button>
                    </div>
                </div>
                <Transition>    
                    <div v-show="showInternalGridStates" class="grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 mx-auto p-2 gap-8 text-white w-full">
                        <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-green-600' : machineActiveReal }">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Machine:</div>
                            <div class="flex justify-center">
                                <div v-if="machineActiveReal"><fwb-badge type="green" size="md">ON</fwb-badge></div>
                                <div v-else><fwb-badge type="default" size="md">OFF</fwb-badge></div>
                            </div>                        
                        </div>
                        <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-blue-500' : selfCheckActiveReal }" >
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Self-Check:</div>
                            <div class="flex justify-center">
                                <div v-if="selfCheckActiveReal"><fwb-badge type="blue" size="md">ON</fwb-badge></div>
                                <div v-else><fwb-badge type="default" size="md">OFF</fwb-badge></div>
                            </div>
                        </div>
                        <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-blue-500' : coolingActiveReal }">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Cooling:</div>
                            <div class="flex justify-center">
                                <div v-if="coolingActiveReal"><fwb-badge type="green" size="md">ON</fwb-badge></div>
                                <div v-else><fwb-badge type="default" size="md">OFF</fwb-badge></div>
                            </div>
                        </div>
                        <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-red-500' : heatingActiveReal }">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Heating:</div>
                            <div class="flex justify-center">
                                <div v-if="heatingActiveReal"><fwb-badge type="green" size="md">ON</fwb-badge></div>
                                <div v-else><fwb-badge type="default" size="md">OFF</fwb-badge></div>
                            </div>
                        </div>
                        <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-purple-500' : dehumidifierActiveReal }">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Dehumidifier:</div>
                            <div class="flex justify-center">
                                <div v-if="dehumidifierActiveReal"><fwb-badge type="purple" size="md">ON</fwb-badge></div>
                                <div v-else><fwb-badge type="default" size="md">OFF</fwb-badge></div>
                            </div>
                        </div>
                        <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-purple-500' : humidifierActiveReal }">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Humidifier:</div>
                            <div class="flex justify-center">
                                <div v-if="humidifierActiveReal"><fwb-badge type="purple" size="md">ON</fwb-badge></div>
                                <div v-else><fwb-badge type="default" size="md">OFF</fwb-badge></div>
                            </div>
                        </div>
                        <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-purple-500' : dryContactAlarmingActiveReal }">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Dry Contact Alarming:</div>
                            <div class="flex justify-center">
                                <div v-if="dryContactAlarmingActiveReal"><fwb-badge type="purple" size="md">ON</fwb-badge></div>
                                <div v-else><fwb-badge type="default" size="md">OFF</fwb-badge></div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>

        <!-- Temperature Grid -->
        <div class="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
            <div class="my-6 mx-2">
                <div class="container flex flex-row">
                    <div class="flex items-start">Temperatures / Humidity:</div>
                    <div class="flex gap-3 flex-1 justify-end">
                        <button @click="showInternalGridTemps = !showInternalGridTemps">
                            <div v-if="showInternalGridTemps">[ - ]</div>
                            <div v-else>[ + ]</div>
                        </button>
                    </div>
                </div>
                <Transition>    
                    <div v-show="showInternalGridTemps" class="grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full">
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Return Air<br />Temp ({{ degreeSymbol }}):</div>
                            <div class="text-4xl grid-rows-1">{{ returnAirTempReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Return Air<br />Humidity:</div>
                            <div class="text-4xl">{{ returnAirHumReal }}%</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Supply Air<br />Temp ({{ degreeSymbol }}):</div>
                            <div class="text-4xl">{{ supplyAirTempReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Supply Air<br />Humidity:</div>
                            <div class="text-4xl">{{ supplyAirHumReal }}%</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Discharge<br />Temp ({{ degreeSymbol }}):</div>
                            <div class="text-4xl">{{ dischargeTempReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Suction<br />Temp ({{ degreeSymbol }}):</div>
                            <div class="text-4xl">{{ suctionTempReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Evaporator<br />Temp ({{ degreeSymbol }}):</div>
                            <div class="text-4xl">{{ evapTempReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Condenser<br />Temp ({{ degreeSymbol }}):</div>
                            <div class="text-4xl">{{ condTempReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Outdoor<br />Temp ({{ degreeSymbol }}):</div>
                            <div class="text-4xl">{{ outdoorTempReal }}</div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>

        <!-- Fans/Motors Grid -->
        <div class="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
            <div class="my-6 mx-2">
                <div class="container flex flex-row">
                    <div class="flex items-start">Fans / Motors:</div>
                    <div class="flex gap-3 flex-1 justify-end">
                        <button @click="showInternalGridMotors = !showInternalGridMotors">
                            <div v-if="showInternalGridMotors">[ - ]</div>
                            <div v-else>[ + ]</div>
                        </button>
                    </div>
                </div>
                <Transition>    
                    <div v-show="showInternalGridMotors" class="grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full">
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Internal Fan (RPM)</div>
                            <div class="text-4xl">{{ internalFanReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">External Fan (RPM)</div>
                            <div class="text-4xl">{{ externalFanReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Condenser Motor (RPM)</div>
                            <div class="text-4xl">{{ condenserMotorReal }}</div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>

        <!-- Other Grid -->
        <div class="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
            <div class="my-6 mx-2">
                <div class="container flex flex-row">
                    <div class="flex items-start">Other Metrics:</div>
                    <div class="flex gap-3 flex-1 justify-end">
                        <button @click="showInternalGridOther = !showInternalGridOther">
                            <div v-if="showInternalGridOther">[ - ]</div>
                            <div v-else>[ + ]</div>
                        </button>
                    </div>
                </div>
                <Transition>    
                    <div v-show="showInternalGridOther" class="grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full">
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">AC Voltage (VAC)</div>
                            <div class="text-4xl">{{ acVoltageReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Compressor Heater <br />Current (A)</div>
                            <div class="text-4xl">{{ compCurrentReal }}</div>
                        </div>
                        <div class="custom-grid">
                            <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">EEV Position</div>
                            <div class="text-4xl">{{ eevPositionReal }}</div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>

    </main>
</template>
