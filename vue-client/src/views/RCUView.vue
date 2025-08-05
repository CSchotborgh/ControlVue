<template>
  <main class="container mx-auto px-4 py-8 text-white">
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
    <div class="flex justify-center uppercase text-xs italic mt-2">
      Last updated: <div id="updatedTime">&nbsp; {{ lastUpdated }}</div>
    </div>   

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
            <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-green-600': machineActiveReal }">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Machine:</div>
              <div class="flex justify-center">
                <div v-if="machineActiveReal">
                  <fwb-badge type="green" size="md">ON</fwb-badge>
                </div>
                <div v-else>
                  <fwb-badge type="default" size="md">OFF</fwb-badge>
                </div>
              </div>                        
            </div>
            <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-blue-500': selfCheckActiveReal }">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Self-Check:</div>
              <div class="flex justify-center">
                <div v-if="selfCheckActiveReal">
                  <fwb-badge type="blue" size="md">ON</fwb-badge>
                </div>
                <div v-else>
                  <fwb-badge type="default" size="md">OFF</fwb-badge>
                </div>
              </div>
            </div>
            <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-blue-500': coolingActiveReal }">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Cooling:</div>
              <div class="flex justify-center">
                <div v-if="coolingActiveReal">
                  <fwb-badge type="green" size="md">ON</fwb-badge>
                </div>
                <div v-else>
                  <fwb-badge type="default" size="md">OFF</fwb-badge>
                </div>
              </div>
            </div>
            <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-red-500': heatingActiveReal }">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Heating:</div>
              <div class="flex justify-center">
                <div v-if="heatingActiveReal">
                  <fwb-badge type="green" size="md">ON</fwb-badge>
                </div>
                <div v-else>
                  <fwb-badge type="default" size="md">OFF</fwb-badge>
                </div>
              </div>
            </div>
            <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-purple-500': dehumidifierActiveReal }">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Dehumidifier:</div>
              <div class="flex justify-center">
                <div v-if="dehumidifierActiveReal">
                  <fwb-badge type="purple" size="md">ON</fwb-badge>
                </div>
                <div v-else>
                  <fwb-badge type="default" size="md">OFF</fwb-badge>
                </div>
              </div>
            </div>
            <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-purple-500': humidifierActiveReal }">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Humidifier:</div>
              <div class="flex justify-center">
                <div v-if="humidifierActiveReal">
                  <fwb-badge type="purple" size="md">ON</fwb-badge>
                </div>
                <div v-else>
                  <fwb-badge type="default" size="md">OFF</fwb-badge>
                </div>
              </div>
            </div>
            <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600" :class="{ 'dark:bg-purple-500': dryContactAlarmingActiveReal }">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Dry Contact Alarming:</div>
              <div class="flex justify-center">
                <div v-if="dryContactAlarmingActiveReal">
                  <fwb-badge type="purple" size="md">ON</fwb-badge>
                </div>
                <div v-else>
                  <fwb-badge type="default" size="md">OFF</fwb-badge>
                </div>
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
              <div class="text-4xl">{{ returnAirTempReal }}</div>
            </div>
            <div class="custom-grid">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Supply Air<br />Temp ({{ degreeSymbol }}):</div>
              <div class="text-4xl">{{ supplyAirTempReal }}</div>
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
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Return Air<br />Humidity:</div>
              <div class="text-4xl">{{ returnAirHumReal }}%</div>
            </div>
            <div class="custom-grid">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Supply Air<br />Humidity:</div>
              <div class="text-4xl">{{ supplyAirHumReal }}%</div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Motors Grid -->
    <div class="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
      <div class="my-6 mx-2">
        <div class="container flex flex-row">
          <div class="flex items-start">Motors / Electrical:</div>
          <div class="flex gap-3 flex-1 justify-end">
            <button @click="showInternalGridMotors = !showInternalGridMotors">
              <div v-if="showInternalGridMotors">[ - ]</div>
              <div v-else>[ + ]</div>
            </button>
          </div>
        </div>
        <Transition>    
          <div v-show="showInternalGridMotors" class="grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 mx-auto p-2 gap-8 text-white w-full">
            <div class="custom-grid">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Internal Fan<br />(RPM):</div>
              <div class="text-4xl">{{ internalFanReal }}</div>
            </div>
            <div class="custom-grid">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">External Fan<br />(RPM):</div>
              <div class="text-4xl">{{ externalFanReal }}</div>
            </div>
            <div class="custom-grid">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Condenser Motor<br />(RPM):</div>
              <div class="text-4xl">{{ condenserMotorReal }}</div>
            </div>
            <div class="custom-grid">
              <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">AC Voltage<br />(V):</div>
              <div class="text-4xl">{{ acVoltageReal }}</div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { FwbBadge } from 'flowbite-vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const showInternalGridStates = ref(false)
const showInternalGridTemps = ref(false)
const showInternalGridMotors = ref(false)
const triggerExpandAll = ref(false)

const toggleExpansion = () => {
  if (triggerExpandAll.value) {
    showInternalGridMotors.value = false
    showInternalGridStates.value = false
    showInternalGridTemps.value = false
  } else {
    showInternalGridMotors.value = true
    showInternalGridStates.value = true
    showInternalGridTemps.value = true
  }
  triggerExpandAll.value = !triggerExpandAll.value
}

const degreeSymbol = ref('°F')

// States
const machineActiveReal = ref(false)
const selfCheckActiveReal = ref(false)
const coolingActiveReal = ref(false)
const heatingActiveReal = ref(false)
const dehumidifierActiveReal = ref(false)
const humidifierActiveReal = ref(false)
const dryContactAlarmingActiveReal = ref(false)

// Variables for real time view
const returnAirTempReal = ref('0.0')
const returnAirHumReal = ref('0')
const supplyAirTempReal = ref('0.0')
const supplyAirHumReal = ref('0')
const internalFanReal = ref('0')
const externalFanReal = ref('0')
const condenserMotorReal = ref('0')
const dischargeTempReal = ref('0.0')
const suctionTempReal = ref('0.0')
const evapTempReal = ref('0.0')
const acVoltageReal = ref('0.0')

const lastUpdated = computed(() => {
  return new Date().toLocaleString()
})

const fetchData = async () => {
  try {
    const response = await axios.get('/api/cooling-unit/data')
    if (response.status === 200) {
      const data = response.data
      
      // Convert temperatures from Celsius to Fahrenheit
      returnAirTempReal.value = ((data.returnAirTemp * 1.8) + 32).toFixed(1)
      returnAirHumReal.value = data.returnAirHumidity.toFixed(0)
      supplyAirTempReal.value = ((data.supplyAirTemp * 1.8) + 32).toFixed(1)
      supplyAirHumReal.value = data.supplyAirHumidity < 1000 ? data.supplyAirHumidity.toFixed(0) : '-'
      internalFanReal.value = data.internalFanRpm.toString()
      externalFanReal.value = data.externalFanRpm.toString()
      condenserMotorReal.value = data.condenserMotorRpm.toString()
      
      machineActiveReal.value = data.machineState
      dischargeTempReal.value = data.dischargeTemp < 500 ? ((data.dischargeTemp * 1.8) + 32).toFixed(1) : '-'
      suctionTempReal.value = ((data.suctionTemp * 1.8) + 32).toFixed(1)
      evapTempReal.value = ((data.evaporatorTemp * 1.8) + 32).toFixed(1)
      acVoltageReal.value = data.acVoltage.toFixed(1)

      selfCheckActiveReal.value = data.selfCheckState || false
      coolingActiveReal.value = data.coolingState
      heatingActiveReal.value = data.heatingState
      dehumidifierActiveReal.value = data.dehumidifierState
      humidifierActiveReal.value = data.humidifierState
      dryContactAlarmingActiveReal.value = data.dryContactAlarmingState
    } else {
      console.error('Error fetching data:', response.status)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
  setInterval(fetchData, 1000) // Fetch data every second
})
</script>