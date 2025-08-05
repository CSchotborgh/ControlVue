<template>
  <main class="container mx-auto px-4 py-8 text-white">
    <h1 class="text-2xl font-bold mb-8">Network Status</h1>
    
    <!-- Last updated section -->
    <div class="flex justify-center uppercase text-xs italic mb-6">
      Last updated: <div id="updatedTime">&nbsp; {{ lastUpdated }}</div>
    </div>

    <!-- Network Status Table -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="edgerack-table">
        <thead>
          <tr>
            <th scope="col">Device</th>
            <th scope="col">IP Address</th>
            <th scope="col">Status</th>
            <th scope="col">Ping (ms)</th>
            <th scope="col">Port</th>
            <th scope="col">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-medium">EDGERACK Controller</td>
            <td>192.168.222.184</td>
            <td>
              <fwb-badge type="green" size="sm">Online</fwb-badge>
            </td>
            <td>{{ controllerPing }}</td>
            <td>80/443</td>
            <td>{{ new Date().toLocaleTimeString() }}</td>
          </tr>
          <tr>
            <td class="font-medium">Cooling Unit #1</td>
            <td>192.168.222.100</td>
            <td>
              <fwb-badge type="green" size="sm">Online</fwb-badge>
            </td>
            <td>{{ coolingUnit1Ping }}</td>
            <td>502</td>
            <td>{{ new Date().toLocaleTimeString() }}</td>
          </tr>
          <tr>
            <td class="font-medium">Temperature Sensor #1</td>
            <td>192.168.222.101</td>
            <td>
              <fwb-badge :type="sensorOnline ? 'green' : 'default'" size="sm">
                {{ sensorOnline ? 'Online' : 'Offline' }}
              </fwb-badge>
            </td>
            <td>{{ sensorOnline ? tempSensorPing : 'N/A' }}</td>
            <td>22</td>
            <td>{{ sensorOnline ? new Date().toLocaleTimeString() : '5 min ago' }}</td>
          </tr>
          <tr>
            <td class="font-medium">Gateway Router</td>
            <td>192.168.222.1</td>
            <td>
              <fwb-badge type="green" size="sm">Online</fwb-badge>
            </td>
            <td>{{ gatewayPing }}</td>
            <td>80/443</td>
            <td>{{ new Date().toLocaleTimeString() }}</td>
          </tr>
          <tr>
            <td class="font-medium">External Monitor</td>
            <td>192.168.222.50</td>
            <td>
              <fwb-badge type="default" size="sm">Standby</fwb-badge>
            </td>
            <td>N/A</td>
            <td>5000</td>
            <td>{{ new Date(Date.now() - 600000).toLocaleTimeString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Network Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="bg-slate-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Connection Status</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Active Connections:</span>
            <span class="text-green-400 font-semibold">{{ activeConnections }}</span>
          </div>
          <div class="flex justify-between">
            <span>Failed Connections:</span>
            <span class="text-red-400 font-semibold">{{ failedConnections }}</span>
          </div>
          <div class="flex justify-between">
            <span>Standby Devices:</span>
            <span class="text-yellow-400 font-semibold">{{ standbyDevices }}</span>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Network Performance</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Average Ping:</span>
            <span class="text-blue-400 font-semibold">{{ averagePing }}ms</span>
          </div>
          <div class="flex justify-between">
            <span>Bandwidth Usage:</span>
            <span class="text-purple-400 font-semibold">{{ bandwidthUsage }}%</span>
          </div>
          <div class="flex justify-between">
            <span>Uptime:</span>
            <span class="text-green-400 font-semibold">{{ uptime }}</span>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Security Status</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Firewall:</span>
            <fwb-badge type="green" size="sm">Active</fwb-badge>
          </div>
          <div class="flex justify-between">
            <span>VPN Status:</span>
            <fwb-badge type="green" size="sm">Connected</fwb-badge>
          </div>
          <div class="flex justify-between">
            <span>Last Security Scan:</span>
            <span class="text-gray-400 text-sm">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-wrap gap-4 mt-8">
      <fwb-button color="blue" @click="refreshNetworkStatus">
        Refresh Status
      </fwb-button>
      <fwb-button color="green" @click="runNetworkTest">
        Run Network Test
      </fwb-button>
      <fwb-button color="yellow" @click="exportLogs">
        Export Logs
      </fwb-button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { FwbBadge, FwbButton } from 'flowbite-vue'

// Network ping data
const controllerPing = ref(12)
const coolingUnit1Ping = ref(8)
const tempSensorPing = ref(15)
const gatewayPing = ref(5)
const sensorOnline = ref(true)

// Network statistics
const activeConnections = ref(4)
const failedConnections = ref(0)
const standbyDevices = ref(1)
const bandwidthUsage = ref(23)
const uptime = ref('15d 7h 23m')

const lastUpdated = computed(() => {
  return new Date().toLocaleString()
})

const averagePing = computed(() => {
  const pings = [controllerPing.value, coolingUnit1Ping.value, tempSensorPing.value, gatewayPing.value]
  return Math.round(pings.reduce((a, b) => a + b, 0) / pings.length)
})

const refreshNetworkStatus = () => {
  // Simulate network status refresh
  controllerPing.value = Math.floor(Math.random() * 20) + 5
  coolingUnit1Ping.value = Math.floor(Math.random() * 15) + 3
  tempSensorPing.value = Math.floor(Math.random() * 25) + 5
  gatewayPing.value = Math.floor(Math.random() * 10) + 1
  
  // Occasionally simulate sensor going offline
  if (Math.random() < 0.1) {
    sensorOnline.value = !sensorOnline.value
  }
  
  console.log('Network status refreshed')
}

const runNetworkTest = () => {
  console.log('Running network diagnostic test...')
  // In a real application, this would trigger network diagnostics
}

const exportLogs = () => {
  console.log('Exporting network logs...')
  // In a real application, this would generate and download logs
}

// Simulate periodic network updates
onMounted(() => {
  setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance to update pings
      refreshNetworkStatus()
    }
  }, 5000) // Check every 5 seconds
})
</script>