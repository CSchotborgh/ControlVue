import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function NetworkView() {
  // Network ping data
  const [controllerPing, setControllerPing] = useState(12);
  const [coolingUnit1Ping, setCoolingUnit1Ping] = useState(8);
  const [tempSensorPing, setTempSensorPing] = useState(15);
  const [gatewayPing, setGatewayPing] = useState(5);
  const [sensorOnline, setSensorOnline] = useState(true);

  // Network statistics
  const [activeConnections] = useState(4);
  const [failedConnections] = useState(0);
  const [standbyDevices] = useState(1);
  const [bandwidthUsage] = useState(23);
  const [uptime] = useState('15d 7h 23m');

  const lastUpdated = new Date().toLocaleString();

  const averagePing = Math.round(
    [controllerPing, coolingUnit1Ping, tempSensorPing, gatewayPing].reduce((a, b) => a + b, 0) / 4
  );

  const refreshNetworkStatus = () => {
    // Simulate network status refresh
    setControllerPing(Math.floor(Math.random() * 20) + 5);
    setCoolingUnit1Ping(Math.floor(Math.random() * 15) + 3);
    setTempSensorPing(Math.floor(Math.random() * 25) + 5);
    setGatewayPing(Math.floor(Math.random() * 10) + 1);
    
    // Occasionally simulate sensor going offline
    if (Math.random() < 0.1) {
      setSensorOnline(!sensorOnline);
    }
    
    console.log('Network status refreshed');
  };

  const runNetworkTest = () => {
    console.log('Running network diagnostic test...');
    // In a real application, this would trigger network diagnostics
  };

  const exportLogs = () => {
    console.log('Exporting network logs...');
    // In a real application, this would generate and download logs
  };

  // Simulate periodic network updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to update pings
        refreshNetworkStatus();
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [sensorOnline]);

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-8">Network Status</h1>
      
      {/* Last updated section */}
      <div className="flex justify-center uppercase text-xs italic mb-6">
        Last updated: <div>&nbsp; {lastUpdated}</div>
      </div>

      {/* Network Status Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="edgerack-table">
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
              <td className="font-medium">EDGERACK Controller</td>
              <td>192.168.222.184</td>
              <td>
                <Badge className="status-badge-on">Online</Badge>
              </td>
              <td>{controllerPing}</td>
              <td>80/443</td>
              <td>{new Date().toLocaleTimeString()}</td>
            </tr>
            <tr>
              <td className="font-medium">Cooling Unit #1</td>
              <td>192.168.222.100</td>
              <td>
                <Badge className="status-badge-on">Online</Badge>
              </td>
              <td>{coolingUnit1Ping}</td>
              <td>502</td>
              <td>{new Date().toLocaleTimeString()}</td>
            </tr>
            <tr>
              <td className="font-medium">Temperature Sensor #1</td>
              <td>192.168.222.101</td>
              <td>
                <Badge className={sensorOnline ? 'status-badge-on' : 'status-badge-off'}>
                  {sensorOnline ? 'Online' : 'Offline'}
                </Badge>
              </td>
              <td>{sensorOnline ? tempSensorPing : 'N/A'}</td>
              <td>22</td>
              <td>{sensorOnline ? new Date().toLocaleTimeString() : '5 min ago'}</td>
            </tr>
            <tr>
              <td className="font-medium">Gateway Router</td>
              <td>192.168.222.1</td>
              <td>
                <Badge className="status-badge-on">Online</Badge>
              </td>
              <td>{gatewayPing}</td>
              <td>80/443</td>
              <td>{new Date().toLocaleTimeString()}</td>
            </tr>
            <tr>
              <td className="font-medium">External Monitor</td>
              <td>192.168.222.50</td>
              <td>
                <Badge className="status-badge-off">Standby</Badge>
              </td>
              <td>N/A</td>
              <td>5000</td>
              <td>{new Date(Date.now() - 600000).toLocaleTimeString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Connection Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Active Connections:</span>
              <span className="text-green-400 font-semibold">{activeConnections}</span>
            </div>
            <div className="flex justify-between">
              <span>Failed Connections:</span>
              <span className="text-red-400 font-semibold">{failedConnections}</span>
            </div>
            <div className="flex justify-between">
              <span>Standby Devices:</span>
              <span className="text-yellow-400 font-semibold">{standbyDevices}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Network Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Average Ping:</span>
              <span className="text-blue-400 font-semibold">{averagePing}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Bandwidth Usage:</span>
              <span className="text-purple-400 font-semibold">{bandwidthUsage}%</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime:</span>
              <span className="text-green-400 font-semibold">{uptime}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Security Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Firewall:</span>
              <Badge className="status-badge-on">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span>VPN Status:</span>
              <Badge className="status-badge-on">Connected</Badge>
            </div>
            <div className="flex justify-between">
              <span>Last Security Scan:</span>
              <span className="text-gray-400 text-sm">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mt-8">
        <Button
          onClick={refreshNetworkStatus}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Refresh Status
        </Button>
        <Button
          onClick={runNetworkTest}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Run Network Test
        </Button>
        <Button
          onClick={exportLogs}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Export Logs
        </Button>
      </div>
    </main>
  );
}