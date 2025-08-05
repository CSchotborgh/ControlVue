import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ConfigView() {
  const [temperatureSettings, setTemperatureSettings] = useState({
    returnAirTarget: '80.6',
    supplyAirTarget: '66.2',
    temperatureUnit: 'fahrenheit',
    temperatureTolerance: '2.0',
    highTempAlarmThreshold: '85.0',
    lowTempAlarmThreshold: '60.0'
  });

  const [controlSettings, setControlSettings] = useState({
    controlMode: 'supply', // 'supply' or 'return'
    autoMode: true,
    fanSpeed: 'auto',
    maintenanceMode: false,
    emergencyShutdown: false,
    alarmSilence: false
  });

  const [networkSettings, setNetworkSettings] = useState({
    ipAddress: '192.168.222.184',
    subnetMask: '255.255.255.0',
    gateway: '192.168.222.1',
    dnsServer: '8.8.8.8',
    httpPort: '80',
    httpsPort: '443',
    modbusPort: '502'
  });

  const [alertSettings, setAlertSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    soundAlerts: true,
    alertEmail: 'admin@company.com',
    alertPhone: '+1-555-0123',
    criticalTempAlert: true,
    networkDownAlert: true,
    powerFailureAlert: true
  });

  const lastUpdated = new Date().toLocaleString();

  const saveTemperatureSettings = () => {
    console.log('Saving temperature settings:', temperatureSettings);
    // Here you would implement the actual save functionality
  };

  const saveControlSettings = () => {
    console.log('Saving control settings:', controlSettings);
    // Here you would implement the actual save functionality
  };

  const saveNetworkSettings = () => {
    console.log('Saving network settings:', networkSettings);
    // Here you would implement the actual save functionality
  };

  const saveAlertSettings = () => {
    console.log('Saving alert settings:', alertSettings);
    // Here you would implement the actual save functionality
  };

  const resetToDefaults = () => {
    console.log('Resetting all settings to factory defaults...');
    // Here you would implement factory reset functionality
  };

  const exportConfig = () => {
    console.log('Exporting configuration...');
    // Here you would implement configuration export functionality
  };

  const importConfig = () => {
    console.log('Importing configuration...');
    // Here you would implement configuration import functionality
  };

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-8">EDGERACK™ Configuration</h1>
      
      {/* Last updated section */}
      <div className="flex justify-center uppercase text-xs italic mb-6">
        Last updated: <div>&nbsp; {lastUpdated}</div>
      </div>

      <Tabs defaultValue="temperature" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="temperature" className="data-[state=active]:bg-slate-700">Temperature</TabsTrigger>
          <TabsTrigger value="control" className="data-[state=active]:bg-slate-700">Control</TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-slate-700">Network</TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700">Alerts</TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-slate-700">System</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature" className="space-y-6 mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Temperature Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure temperature targets and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="returnAirTarget" className="text-white">Return Air Target (°F)</Label>
                  <Input
                    id="returnAirTarget"
                    value={temperatureSettings.returnAirTarget}
                    onChange={(e) => setTemperatureSettings(prev => ({ ...prev, returnAirTarget: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplyAirTarget" className="text-white">Supply Air Target (°F)</Label>
                  <Input
                    id="supplyAirTarget"
                    value={temperatureSettings.supplyAirTarget}
                    onChange={(e) => setTemperatureSettings(prev => ({ ...prev, supplyAirTarget: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperatureTolerance" className="text-white">Temperature Tolerance (±°F)</Label>
                  <Input
                    id="temperatureTolerance"
                    value={temperatureSettings.temperatureTolerance}
                    onChange={(e) => setTemperatureSettings(prev => ({ ...prev, temperatureTolerance: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperatureUnit" className="text-white">Temperature Unit</Label>
                  <Select value={temperatureSettings.temperatureUnit} onValueChange={(value) => setTemperatureSettings(prev => ({ ...prev, temperatureUnit: value }))}>
                    <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                      <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highTempAlarm" className="text-white">High Temperature Alarm (°F)</Label>
                  <Input
                    id="highTempAlarm"
                    value={temperatureSettings.highTempAlarmThreshold}
                    onChange={(e) => setTemperatureSettings(prev => ({ ...prev, highTempAlarmThreshold: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowTempAlarm" className="text-white">Low Temperature Alarm (°F)</Label>
                  <Input
                    id="lowTempAlarm"
                    value={temperatureSettings.lowTempAlarmThreshold}
                    onChange={(e) => setTemperatureSettings(prev => ({ ...prev, lowTempAlarmThreshold: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
              </div>
              <Button onClick={saveTemperatureSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Temperature Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Control Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure operational control parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="controlMode" className="text-white">Control Mode</Label>
                    <Select value={controlSettings.controlMode} onValueChange={(value) => setControlSettings(prev => ({ ...prev, controlMode: value }))}>
                      <SelectTrigger className="w-48 bg-slate-700 text-white border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supply">Supply Air</SelectItem>
                        <SelectItem value="return">Return Air</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fanSpeed" className="text-white">Fan Speed</Label>
                    <Select value={controlSettings.fanSpeed} onValueChange={(value) => setControlSettings(prev => ({ ...prev, fanSpeed: value }))}>
                      <SelectTrigger className="w-48 bg-slate-700 text-white border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoMode" className="text-white">Automatic Mode</Label>
                    <Switch
                      id="autoMode"
                      checked={controlSettings.autoMode}
                      onCheckedChange={(checked) => setControlSettings(prev => ({ ...prev, autoMode: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode" className="text-white">Maintenance Mode</Label>
                    <Switch
                      id="maintenanceMode"
                      checked={controlSettings.maintenanceMode}
                      onCheckedChange={(checked) => setControlSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alarmSilence" className="text-white">Alarm Silence</Label>
                    <Switch
                      id="alarmSilence"
                      checked={controlSettings.alarmSilence}
                      onCheckedChange={(checked) => setControlSettings(prev => ({ ...prev, alarmSilence: checked }))}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={saveControlSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Control Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Network Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure network and communication parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ipAddress" className="text-white">IP Address</Label>
                  <Input
                    id="ipAddress"
                    value={networkSettings.ipAddress}
                    onChange={(e) => setNetworkSettings(prev => ({ ...prev, ipAddress: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subnetMask" className="text-white">Subnet Mask</Label>
                  <Input
                    id="subnetMask"
                    value={networkSettings.subnetMask}
                    onChange={(e) => setNetworkSettings(prev => ({ ...prev, subnetMask: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gateway" className="text-white">Gateway</Label>
                  <Input
                    id="gateway"
                    value={networkSettings.gateway}
                    onChange={(e) => setNetworkSettings(prev => ({ ...prev, gateway: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dnsServer" className="text-white">DNS Server</Label>
                  <Input
                    id="dnsServer"
                    value={networkSettings.dnsServer}
                    onChange={(e) => setNetworkSettings(prev => ({ ...prev, dnsServer: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="httpPort" className="text-white">HTTP Port</Label>
                  <Input
                    id="httpPort"
                    value={networkSettings.httpPort}
                    onChange={(e) => setNetworkSettings(prev => ({ ...prev, httpPort: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="httpsPort" className="text-white">HTTPS Port</Label>
                  <Input
                    id="httpsPort"
                    value={networkSettings.httpsPort}
                    onChange={(e) => setNetworkSettings(prev => ({ ...prev, httpsPort: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
              </div>
              <Button onClick={saveNetworkSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Network Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Alert Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure alert and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Alert Methods</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailAlerts" className="text-white">Email Alerts</Label>
                    <Switch
                      id="emailAlerts"
                      checked={alertSettings.emailAlerts}
                      onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, emailAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsAlerts" className="text-white">SMS Alerts</Label>
                    <Switch
                      id="smsAlerts"
                      checked={alertSettings.smsAlerts}
                      onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, smsAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="soundAlerts" className="text-white">Sound Alerts</Label>
                    <Switch
                      id="soundAlerts"
                      checked={alertSettings.soundAlerts}
                      onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, soundAlerts: checked }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Alert Types</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="criticalTempAlert" className="text-white">Critical Temperature</Label>
                    <Switch
                      id="criticalTempAlert"
                      checked={alertSettings.criticalTempAlert}
                      onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, criticalTempAlert: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="networkDownAlert" className="text-white">Network Down</Label>
                    <Switch
                      id="networkDownAlert"
                      checked={alertSettings.networkDownAlert}
                      onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, networkDownAlert: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="powerFailureAlert" className="text-white">Power Failure</Label>
                    <Switch
                      id="powerFailureAlert"
                      checked={alertSettings.powerFailureAlert}
                      onCheckedChange={(checked) => setAlertSettings(prev => ({ ...prev, powerFailureAlert: checked }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alertEmail" className="text-white">Alert Email Address</Label>
                  <Input
                    id="alertEmail"
                    type="email"
                    value={alertSettings.alertEmail}
                    onChange={(e) => setAlertSettings(prev => ({ ...prev, alertEmail: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alertPhone" className="text-white">Alert Phone Number</Label>
                  <Input
                    id="alertPhone"
                    value={alertSettings.alertPhone}
                    onChange={(e) => setAlertSettings(prev => ({ ...prev, alertPhone: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
              </div>
              <Button onClick={saveAlertSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Alert Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">System Configuration</CardTitle>
              <CardDescription className="text-gray-400">
                System-level configuration and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Configuration Management</h3>
                  <Button onClick={exportConfig} className="bg-green-600 hover:bg-green-700 w-full">
                    Export Configuration
                  </Button>
                  <div className="space-y-2">
                    <Label htmlFor="configFile" className="text-white">Import Configuration</Label>
                    <Input
                      id="configFile"
                      type="file"
                      accept=".json,.config"
                      className="bg-slate-700 text-white border-slate-600"
                    />
                    <Button onClick={importConfig} className="bg-blue-600 hover:bg-blue-700 w-full">
                      Import Configuration
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">System Reset</h3>
                  <p className="text-gray-400 text-sm">Reset all settings to factory defaults. This action cannot be undone.</p>
                  <Button onClick={resetToDefaults} variant="destructive" className="w-full">
                    Reset to Factory Defaults
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model:</span>
                      <span className="text-white">EDGERACK CU-2000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Serial Number:</span>
                      <span className="text-white">EDG-CU-001-2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Firmware Version:</span>
                      <span className="text-white">v2.1.3</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-white">15d 7h 23m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CPU Usage:</span>
                      <span className="text-white">23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Memory Usage:</span>
                      <span className="text-white">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}