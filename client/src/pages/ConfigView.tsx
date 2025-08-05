import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function ConfigView() {
  const [showGeneralSettings, setShowGeneralSettings] = useState(false);
  const [showNetworkSettings, setShowNetworkSettings] = useState(false);
  const [showAdminControls, setShowAdminControls] = useState(false);

  // Real data from your EDGERACK system
  const configData = {
    general: {
      temperatureUnits: "Fahrenheit",
      ntpClientEnabled: "Yes",
      timeZone: "Pacific",
      ntpServer: "0.us.pool.ntp.org"
    },
    network: {
      realTime: {
        primaryMac: "F8:DC:7A:97:51:FA",
        primaryLinkStatus: "connected",
        primaryIpv4: "192.168.222.184",
        primaryNetmask: "255.255.255.0",
        primaryGateway: "192.168.222.244",
        primaryDns: "192.168.222.244",
        secondaryMac: "F8:DC:7A:97:51:FB",
        secondaryLinkStatus: "connected",
        secondaryIpv4: "10.36.9.235",
        secondaryNetmask: "255.255.224.0",
        secondaryGateway: "10.36.0.1",
        secondaryDns: "8.8.8.8 1.1.1.1"
      },
      primaryEthernet: {
        interface: "Enabled",
        ipv4: "Enabled",
        ipv4Dhcp: "Enabled",
        ipv6: "Enabled",
        staticIp: "172.144.60.199",
        netmask: "255.255.224.0",
        gateway: "172.144.60.1"
      },
      secondaryEthernet: {
        interface: "Enabled",
        ipv4: "Enabled",
        ipv4Dhcp: "Enabled",
        ipv6: "Disabled",
        staticIp: "10.10.54.221",
        netmask: "255.255.255.0",
        gateway: "10.10.54.1"
      }
    },
    administration: {
      eventLogCount: "1430"
    }
  };

  const clearEventLog = () => {
    console.log('Clearing event log...');
    // Implementation for clearing event log
  };

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
        <h1 className="text-2xl font-semibold mb-6 text-white">Configuration:</h1>

        {/* General Settings Section */}
        <div className="config-section mb-4">
          <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">General Settings</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowGeneralSettings(!showGeneralSettings)}>
              <div className="text-xl">{showGeneralSettings ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showGeneralSettings && (
          <div className="cooling-content">
            <div className="space-y-6">
              {/* Temperature Units */}
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Temperature Units</Label>
                <Select value={configData.general.temperatureUnits.toLowerCase()}>
                  <SelectTrigger className="w-48 bg-slate-700 text-white border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
                    <SelectItem value="celsius">Celsius</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* NTP Client Enabled */}
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">NTP Client Enabled</Label>
                <Badge className={configData.general.ntpClientEnabled === 'Yes' ? 'status-badge-on' : 'status-badge-off'}>
                  {configData.general.ntpClientEnabled}
                </Badge>
              </div>

              {/* Time Zone */}
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Time Zone</Label>
                <Select value={configData.general.timeZone.toLowerCase()}>
                  <SelectTrigger className="w-48 bg-slate-700 text-white border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pacific">Pacific</SelectItem>
                    <SelectItem value="mountain">Mountain</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* NTP Server */}
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">NTP Server</Label>
                <Input
                  value={configData.general.ntpServer}
                  className="w-64 bg-slate-700 text-white border-slate-600 edgerack-monospace"
                  readOnly
                />
              </div>

              {/* Manually Set Date/Time */}
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Manually Set Date/Time</Label>
                <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                  Set Date/Time
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Network Settings Section */}
        <div className="config-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">Network Settings</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowNetworkSettings(!showNetworkSettings)}>
              <div className="text-xl">{showNetworkSettings ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showNetworkSettings && (
          <div className="cooling-content">
            <div className="space-y-8">
              
              {/* Real-Time Network */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Real-Time Network</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Primary Network */}
                  <div className="space-y-3">
                    <h4 className="text-md font-semibold">Primary Network</h4>
                    
                    <div className="flex justify-between">
                      <span>Primary MAC Address:</span>
                      <span className="edgerack-monospace text-green-400">{configData.network.realTime.primaryMac}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Primary Link Status:</span>
                      <Badge className="status-badge-on">{configData.network.realTime.primaryLinkStatus}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Primary IPv4 Address:</span>
                      <span className="edgerack-monospace text-green-400">{configData.network.realTime.primaryIpv4}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Primary IPv4 Netmask:</span>
                      <span className="edgerack-monospace">{configData.network.realTime.primaryNetmask}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Primary IPv4 Gateway:</span>
                      <span className="edgerack-monospace">{configData.network.realTime.primaryGateway}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Primary IPv4 DNS:</span>
                      <span className="edgerack-monospace">{configData.network.realTime.primaryDns}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Primary IPv6 Address(es):</span>
                      <span className="edgerack-monospace">-</span>
                    </div>
                  </div>

                  {/* Secondary Network */}
                  <div className="space-y-3">
                    <h4 className="text-md font-semibold">Secondary Network</h4>
                    
                    <div className="flex justify-between">
                      <span>Secondary MAC Address:</span>
                      <span className="edgerack-monospace text-green-400">{configData.network.realTime.secondaryMac}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Secondary Link Status:</span>
                      <Badge className="status-badge-on">{configData.network.realTime.secondaryLinkStatus}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Secondary IPv4 Address:</span>
                      <span className="edgerack-monospace text-green-400">{configData.network.realTime.secondaryIpv4}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Secondary IPv4 Netmask:</span>
                      <span className="edgerack-monospace">{configData.network.realTime.secondaryNetmask}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Secondary IPv4 Gateway:</span>
                      <span className="edgerack-monospace">{configData.network.realTime.secondaryGateway}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Secondary IPv4 DNS:</span>
                      <span className="edgerack-monospace">{configData.network.realTime.secondaryDns}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Secondary IPv6 Address(es):</span>
                      <span className="edgerack-monospace">-</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Ethernet Interface */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Primary Ethernet</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex justify-between">
                    <span>Interface</span>
                    <Badge className="status-badge-on">{configData.network.primaryEthernet.interface}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>IPv4</span>
                    <Badge className="status-badge-on">{configData.network.primaryEthernet.ipv4}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>IPv4 DHCP</span>
                    <Badge className="status-badge-on">{configData.network.primaryEthernet.ipv4Dhcp}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>IPv6</span>
                    <Badge className="status-badge-on">{configData.network.primaryEthernet.ipv6}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Static IP (Primary)</span>
                    <span className="edgerack-monospace">{configData.network.primaryEthernet.staticIp}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Netmask (Primary)</span>
                    <span className="edgerack-monospace">{configData.network.primaryEthernet.netmask}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Gateway Address (Primary)</span>
                    <span className="edgerack-monospace">{configData.network.primaryEthernet.gateway}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Ethernet Interface */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Secondary Ethernet</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex justify-between">
                    <span>Interface</span>
                    <Badge className="status-badge-on">{configData.network.secondaryEthernet.interface}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>IPv4</span>
                    <Badge className="status-badge-on">{configData.network.secondaryEthernet.ipv4}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>IPv4 DHCP</span>
                    <Badge className="status-badge-on">{configData.network.secondaryEthernet.ipv4Dhcp}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>IPv6</span>
                    <Badge className="status-badge-off">{configData.network.secondaryEthernet.ipv6}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Static IP (Secondary)</span>
                    <span className="edgerack-monospace">{configData.network.secondaryEthernet.staticIp}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Netmask (Secondary)</span>
                    <span className="edgerack-monospace">{configData.network.secondaryEthernet.netmask}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Gateway Address (Secondary)</span>
                    <span className="edgerack-monospace">{configData.network.secondaryEthernet.gateway}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Administration Controls Section */}
        <div className="config-section">
        <div className="cooling-header">
          <div className="flex items-start text-xl font-semibold">Administration Controls</div>
          <div className="flex gap-3 flex-1 justify-end">
            <button onClick={() => setShowAdminControls(!showAdminControls)}>
              <div className="text-xl">{showAdminControls ? '[ - ]' : '[ + ]'}</div>
            </button>
          </div>
        </div>
        
        {showAdminControls && (
          <div className="cooling-content">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg font-semibold">Clear Event Log</Label>
                  <div className="text-sm text-gray-400 mt-1">
                    Event Log Count: <span className="edgerack-monospace text-green-400">{configData.administration.eventLogCount}</span>
                  </div>
                </div>
                <Button 
                  onClick={clearEventLog}
                  variant="outline" 
                  size="sm"
                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  Clear Event Log
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}