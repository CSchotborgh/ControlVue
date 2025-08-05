<template>
  <main class="container mx-auto px-4 py-8 text-white">
    <!-- Top level container for Cooling Unit section -->
    <div class="max-h-fit my-6 grid grid-rows-1 border rounded-3xl bg-slate-800">
      <div class="my-6 mx-2">
        <div class="container flex flex-row">
          <div class="flex items-start text-2xl">Cooling Unit</div>
          <div class="flex gap-3 flex-1 justify-end">
            <button @click="showInternalGrid = !showInternalGrid">
              <div v-if="showInternalGrid" class="text-2xl">[ - ]</div>
              <div v-else class="text-2xl">[ + ]</div>
            </button>
          </div>
        </div>
        <div v-show="showInternalGrid" class="flex justify-center uppercase text-xs italic m-2">
          Last updated: <div id="updatedTime">&nbsp; {{ lastUpdated }}</div>
        </div>   
        <Transition>
          <div v-show="showInternalGrid">
            <!-- Horizontal separator for Controls grids -->
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-11/12 h-px mt-6 bg-gray-200 border-0 dark:bg-gray-300">
              <span class="absolute mt-6 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800 uppercase">Controls</span>
            </div>

            <!-- Control grids -->
            <div v-show="!loggedIn" class="flex justify-center text-sm italic m-2">Log in to modify controls</div>
            <div class="grid grid-cols-2 m-2 sm:grid-cols-3 mx-auto gap-8 text-white w-full justify-around">
              <div class="custom-grid border-none" :class="{ 'grid-rows-2': loggedIn }">
                <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Machine:</div>
                <div class="flex justify-center">
                  <div v-if="machineActiveReal">
                    <fwb-badge type="green" size="md">ON</fwb-badge>
                  </div>
                  <div v-else>
                    <fwb-badge type="default" size="md">OFF</fwb-badge>
                  </div>
                </div>
                <div v-show="loggedIn">
                  <fwb-toggle v-model="machineActive" color="green"/>
                </div>
              </div>
              <div class="custom-grid border-none" :class="{ 'grid-rows-2': loggedIn }">
                <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Control Mode:</div>
                <div class="flex justify-center">
                  <div v-if="controlModeReal">
                    <fwb-badge type="green" size="md">Supply Air</fwb-badge>
                  </div>
                  <div v-else>
                    <fwb-badge type="default" size="md">Return Air</fwb-badge>
                  </div>
                </div>
                <div v-show="loggedIn">
                  <fwb-toggle v-model="controllingSupplyAir" color="green"/>
                </div>
              </div>
              <div v-if="controlModeReal" class="custom-grid border-none" :class="{ 'grid-rows-2': loggedIn }">
                <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Supply Air Target ({{ degreeSymbol }}):</div>
                <div class="text-4xl">{{ supplyAirTargetReal }}</div>
                <div v-show="loggedIn">
                  <fwb-input v-model="supplyAirTarget" placeholder="Value" />
                </div>
              </div>
              <div v-else class="custom-grid border-none" :class="{ 'grid-rows-2': loggedIn }">
                <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Return Air Target ({{ degreeSymbol }}):</div>
                <div class="text-4xl">{{ returnAirTargetReal }}</div>
                <div v-show="loggedIn">
                  <fwb-input v-model="returnAirTarget" placeholder="Value" />
                </div>
              </div>
            </div>

            <!-- HR separator for Real Time Data section-->
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-11/12 h-px mt-6 bg-gray-200 border-0 dark:bg-gray-300">
              <span class="absolute mt-6 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800 uppercase">Real Time Data</span>
            </div>

            <!-- Real time data grids -->
            <div class="grid grid-cols-2 m-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto p-2 gap-8 text-white w-full">
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
          </div>
        </Transition>
      </div>
    </div>

    <!-- Temporary login simulation -->
    <div class="mt-8 flex items-center space-x-4">
      <fwb-button color="light" pill @click="loggedIn = !loggedIn">
        Toggle Log In State
      </fwb-button>
      <div class="text-white">
        Status: &nbsp;
        <span v-if="loggedIn" class="text-green-400 font-semibold">Logged In</span>
        <span v-else class="text-gray-400">Logged Out</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { FwbBadge, FwbToggle, FwbButton, FwbInput } from 'flowbite-vue'
import axios from 'axios'

const degreeSymbol = ref('°F')
const showInternalGrid = ref(false)
const loggedIn = ref(false)
const machineActive = ref(true)
const controllingSupplyAir = ref(true)
const returnAirTarget = ref('80.6')
const supplyAirTarget = ref('66.2')

// Variables for real time view
const returnAirTempReal = ref('0.0')
const returnAirHumReal = ref('0')
const supplyAirTempReal = ref('0.0')
const supplyAirHumReal = ref('0')
const internalFanReal = ref('0')
const externalFanReal = ref('0')
const condenserMotorReal = ref('0')
const machineActiveReal = ref(false)
const controlModeReal = ref(true)
const returnAirTargetReal = ref('0.0')
const supplyAirTargetReal = ref('0.0')

const lastUpdated = computed(() => {
  return new Date().toLocaleString()
})

const fetchData = async () => {
  try {
    const response = await axios.get('/api/cooling-unit/data')
    if (response.status === 200) {
      const data = response.data
      
      // Convert temperatures from Celsius to Fahrenheit and format
      returnAirTargetReal.value = ((24.0 * 1.8) + 32).toFixed(1) // Default target temp
      returnAirTempReal.value = ((data.returnAirTemp * 1.8) + 32).toFixed(1)
      returnAirHumReal.value = data.returnAirHumidity.toFixed(0)
      supplyAirTargetReal.value = ((19.0 * 1.8) + 32).toFixed(1) // Default target temp
      supplyAirTempReal.value = ((data.supplyAirTemp * 1.8) + 32).toFixed(1)
      supplyAirHumReal.value = data.supplyAirHumidity < 1000 ? data.supplyAirHumidity.toFixed(0) : '-'
      internalFanReal.value = data.internalFanRpm.toString()
      externalFanReal.value = data.externalFanRpm.toString()
      condenserMotorReal.value = data.condenserMotorRpm.toString()
      machineActiveReal.value = data.machineState
      controlModeReal.value = true // Default to supply air mode
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