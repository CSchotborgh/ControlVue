/**
 * EDGERACK Cooling Unit Control System - Administration View
 * 
 * System administration interface providing user management, system configuration,
 * and log monitoring capabilities. This page is designed for system administrators
 * to manage users, configure system settings, and monitor operational logs
 * in industrial cooling unit deployments.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function AdminView() {
  const [systemSettings, setSystemSettings] = useState({
    unitName: 'EDGERACK-CU-001',
    location: 'Data Center - Row A',
    timezone: 'UTC-05:00',
    alertEmail: 'admin@company.com',
    maintenanceMode: false
  });

  const [userManagement, setUserManagement] = useState([
    { id: 1, username: 'admin', role: 'Administrator', lastLogin: '2025-01-05 19:30', status: 'Active' },
    { id: 2, username: 'operator1', role: 'Operator', lastLogin: '2025-01-05 15:22', status: 'Active' },
    { id: 3, username: 'maintenance', role: 'Maintenance', lastLogin: '2025-01-04 08:15', status: 'Inactive' }
  ]);

  const [systemLogs] = useState([
    { timestamp: '2025-01-05 19:35', level: 'INFO', message: 'Cooling unit startup sequence completed' },
    { timestamp: '2025-01-05 19:30', level: 'WARN', message: 'High temperature detected on sensor #3' },
    { timestamp: '2025-01-05 19:25', level: 'INFO', message: 'User admin logged in from 192.168.222.100' },
    { timestamp: '2025-01-05 19:20', level: 'ERROR', message: 'Network timeout on external fan controller' },
    { timestamp: '2025-01-05 19:15', level: 'INFO', message: 'Automatic backup completed successfully' }
  ]);

  const lastUpdated = new Date().toLocaleString();

  const handleSaveSettings = () => {
    console.log('Saving system settings:', systemSettings);
    // Here you would implement the actual save functionality
  };

  const exportLogs = () => {
    console.log('Exporting system logs...');
    // Here you would implement log export functionality
  };

  const clearLogs = () => {
    console.log('Clearing old logs...');
    // Here you would implement log clearing functionality
  };

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-8">EDGERACK™ Administration</h1>
      
      {/* Last updated section */}
      <div className="flex justify-center uppercase text-xs italic mb-6">
        Last updated: <div>&nbsp; {lastUpdated}</div>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">System Settings</TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-slate-700">User Management</TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-slate-700">System Logs</TabsTrigger>
          <TabsTrigger value="backup" className="data-[state=active]:bg-slate-700">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">System Configuration</CardTitle>
              <CardDescription className="text-gray-400">
                Configure basic system settings and parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4 bg-[#0c0c1c]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unitName" className="text-white">Unit Name</Label>
                  <Input
                    id="unitName"
                    value={systemSettings.unitName}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, unitName: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    value={systemSettings.location}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">Timezone</Label>
                  <Input
                    id="timezone"
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alertEmail" className="text-white">Alert Email</Label>
                  <Input
                    id="alertEmail"
                    type="email"
                    value={systemSettings.alertEmail}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, alertEmail: e.target.value }))}
                    className="bg-slate-700 text-white border-slate-600"
                  />
                </div>
              </div>
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-gray-400">
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="edgerack-table">
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Role</th>
                      <th scope="col">Last Login</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userManagement.map((user) => (
                      <tr key={user.id}>
                        <td className="font-medium">{user.username}</td>
                        <td>{user.role}</td>
                        <td>{user.lastLogin}</td>
                        <td>
                          <Badge className={user.status === 'Active' ? 'status-badge-on' : 'status-badge-off'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Add New User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">System Logs</CardTitle>
              <CardDescription className="text-gray-400">
                View and manage system logs and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Button onClick={exportLogs} className="bg-blue-600 hover:bg-blue-700">
                  Export Logs
                </Button>
                <Button onClick={clearLogs} variant="destructive">
                  Clear Old Logs
                </Button>
              </div>
              <div className="relative overflow-x-auto">
                <table className="edgerack-table">
                  <thead>
                    <tr>
                      <th scope="col">Timestamp</th>
                      <th scope="col">Level</th>
                      <th scope="col">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemLogs.map((log, index) => (
                      <tr key={index}>
                        <td className="font-medium">{log.timestamp}</td>
                        <td>
                          <Badge className={
                            log.level === 'ERROR' ? 'status-badge-off' :
                            log.level === 'WARN' ? 'status-badge-yellow' :
                            'status-badge-blue'
                          }>
                            {log.level}
                          </Badge>
                        </td>
                        <td>{log.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Backup & Restore</CardTitle>
              <CardDescription className="text-gray-400">
                Backup and restore system configuration and data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Create Backup</h3>
                  <p className="text-gray-400">Create a backup of current system configuration and settings</p>
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    Create Full Backup
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 w-full">
                    Create Config Only Backup
                  </Button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Restore Backup</h3>
                  <p className="text-gray-400">Restore system from a previous backup file</p>
                  <Input
                    type="file"
                    accept=".backup,.json"
                    className="bg-slate-700 text-white border-slate-600"
                  />
                  <Button variant="destructive" className="w-full">
                    Restore from Backup
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Backups</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
                    <span>Full_Backup_2025-01-05_19-00.backup</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                        Download
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
                    <span>Config_Backup_2025-01-04_12-30.backup</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                        Download
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
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