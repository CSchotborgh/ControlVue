import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Download, RefreshCw } from 'lucide-react';

export default function UpgradeView() {
  const [currentVersion] = useState('v2.1.3');
  const [availableUpdate] = useState('v2.2.1');
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);

  const [updateHistory] = useState([
    {
      version: 'v2.1.3',
      date: '2024-12-15',
      status: 'Current',
      description: 'Security patches and performance improvements'
    },
    {
      version: 'v2.1.2',
      date: '2024-11-20',
      status: 'Installed',
      description: 'UI enhancements and bug fixes'
    },
    {
      version: 'v2.1.1',
      date: '2024-10-28',
      status: 'Installed',
      description: 'Critical temperature sensor calibration update'
    },
    {
      version: 'v2.1.0',
      date: '2024-09-15',
      status: 'Installed',
      description: 'Major feature release with new monitoring capabilities'
    }
  ]);

  const [releaseNotes] = useState({
    version: 'v2.2.1',
    releaseDate: '2025-01-03',
    highlights: [
      'Enhanced real-time monitoring with 50% faster data refresh',
      'New predictive maintenance algorithms',
      'Improved network resilience and auto-recovery',
      'Advanced temperature control precision',
      'Extended API compatibility for third-party integrations'
    ],
    fixes: [
      'Fixed rare memory leak in long-running operations',
      'Resolved temperature sensor drift compensation',
      'Corrected network timeout handling',
      'Fixed UI responsiveness on mobile devices'
    ],
    requirements: [
      'Minimum 2GB RAM (4GB recommended)',
      'Network connectivity required during update',
      'Backup of current configuration recommended',
      'Estimated downtime: 5-10 minutes'
    ]
  });

  const lastUpdated = new Date().toLocaleString();

  const checkForUpdates = async () => {
    setIsChecking(true);
    // Simulate checking for updates
    setTimeout(() => {
      setIsChecking(false);
      console.log('Checked for updates');
    }, 2000);
  };

  const downloadUpdate = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const installUpdate = async () => {
    if (downloadProgress < 100) {
      console.log('Download must complete before installation');
      return;
    }
    
    setIsInstalling(true);
    setInstallProgress(0);
    
    // Simulate installation progress
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          console.log('Update installation completed');
          return 100;
        }
        return prev + 5;
      });
    }, 800);
  };

  const createBackup = () => {
    console.log('Creating system backup before update...');
    // Here you would implement backup creation
  };

  const rollbackUpdate = () => {
    console.log('Rolling back to previous version...');
    // Here you would implement rollback functionality
  };

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-8">EDGERACK™ System Updates</h1>
      
      {/* Last updated section */}
      <div className="flex justify-center uppercase text-xs italic mb-6">
        Last updated: <div>&nbsp; {lastUpdated}</div>
      </div>

      {/* Current System Status */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Current System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Current Version</div>
              <div className="text-2xl font-bold text-white">{currentVersion}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">System Status</div>
              <Badge className="status-badge-on">Running Stable</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Last Update Check</div>
              <div className="text-white">2 hours ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Updates */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Available Updates</CardTitle>
          <CardDescription className="text-gray-400">
            New firmware updates available for download
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-900/50 border-blue-600">
            <Download className="h-4 w-4" />
            <AlertTitle className="text-blue-200">Update Available: {availableUpdate}</AlertTitle>
            <AlertDescription className="text-blue-100">
              A new firmware version is available with performance improvements and security updates.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button
              onClick={checkForUpdates}
              disabled={isChecking}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isChecking ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check for Updates'
              )}
            </Button>
            <Button onClick={createBackup} variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
              Create Backup
            </Button>
          </div>

          {/* Download Progress */}
          {(isDownloading || downloadProgress > 0) && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Downloading {availableUpdate}</span>
                <span className="text-sm text-gray-400">{downloadProgress}%</span>
              </div>
              <Progress value={downloadProgress} className="w-full" />
            </div>
          )}

          {/* Installation Progress */}
          {(isInstalling || installProgress > 0) && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Installing {availableUpdate}</span>
                <span className="text-sm text-gray-400">{installProgress}%</span>
              </div>
              <Progress value={installProgress} className="w-full" />
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={downloadUpdate}
              disabled={isDownloading || downloadProgress === 100 || isInstalling}
              className="bg-green-600 hover:bg-green-700"
            >
              {isDownloading ? 'Downloading...' : downloadProgress === 100 ? 'Downloaded' : 'Download Update'}
            </Button>
            <Button
              onClick={installUpdate}
              disabled={downloadProgress < 100 || isInstalling || installProgress === 100}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isInstalling ? 'Installing...' : installProgress === 100 ? 'Installed' : 'Install Update'}
            </Button>
            <Button onClick={rollbackUpdate} variant="destructive">
              Rollback Previous
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Release Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Release Notes - {releaseNotes.version}</CardTitle>
            <CardDescription className="text-gray-400">
              Released: {releaseNotes.releaseDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4 bg-[#0b0b1a]">
            <div>
              <h4 className="font-semibold text-white mb-2">New Features & Improvements</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {releaseNotes.highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Bug Fixes</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {releaseNotes.fixes.map((fix, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-blue-400 mt-1 flex-shrink-0" />
                    {fix}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Update Requirements</CardTitle>
            <CardDescription className="text-gray-400">
              Please review before proceeding with the update
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">System Requirements</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {releaseNotes.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            <Alert className="bg-yellow-900/50 border-yellow-600">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-yellow-200">Important Notice</AlertTitle>
              <AlertDescription className="text-yellow-100">
                The system will be temporarily unavailable during the update process. 
                Ensure all critical operations are completed before proceeding.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Update History */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Update History</CardTitle>
          <CardDescription className="text-gray-400">
            Previous firmware versions and installation history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="edgerack-table">
              <thead>
                <tr>
                  <th scope="col">Version</th>
                  <th scope="col">Release Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {updateHistory.map((update, index) => (
                  <tr key={index}>
                    <td className="font-medium">{update.version}</td>
                    <td>{update.date}</td>
                    <td>
                      <Badge className={update.status === 'Current' ? 'status-badge-on' : 'status-badge-blue'}>
                        {update.status}
                      </Badge>
                    </td>
                    <td>{update.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Software Package Upgrading */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Software Package Upgrading:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 bg-[#090917]">
          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="upgrade-file"
                className="hidden"
                accept=".bin,.pkg,.tar.gz,.zip"
              />
              <label
                htmlFor="upgrade-file"
                className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded border border-slate-600"
              >
                Select package file...
              </label>
              <span className="text-gray-400 text-sm">No file chosen</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Upload Upgrade File
            </Button>
          </div>

          {/* Upgrade Log */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Upgrade Log:</h3>
            <div className="relative overflow-x-auto">
              <table className="edgerack-table">
                <thead>
                  <tr>
                    <th scope="col">Start Time</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Hash</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="edgerack-monospace">2025-05-28 12:28:40</td>
                    <td>1 min 11 sec</td>
                    <td className="edgerack-monospace text-xs">33bf014c2b55d8a62c5a254978551c9c</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-05-27 20:30:20</td>
                    <td>1 min 6 sec</td>
                    <td className="edgerack-monospace text-xs">10e12138956c520c9a1e33e68b3abcd8</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-03-26 11:07:51</td>
                    <td>1 min 5 sec</td>
                    <td className="edgerack-monospace text-xs">3186dd1e7601747a67631ad61d864aaf</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-03-11 12:23:40</td>
                    <td>1 min 10 sec</td>
                    <td className="edgerack-monospace text-xs">52b585d8e28750a81b46302ea5808f20</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-24 19:32:05</td>
                    <td>1 min 12 sec</td>
                    <td className="edgerack-monospace text-xs">ec1abc41db50f16817a9e77fcdd36b15</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-24 18:44:49</td>
                    <td>1 min 11 sec</td>
                    <td className="edgerack-monospace text-xs">4c71ecaaf5c63934f17ac95ff1828029</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-20 14:31:29</td>
                    <td>1 min 4 sec</td>
                    <td className="edgerack-monospace text-xs">bc5de544fead7adf78e1a7fc560750c7</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-17 15:10:21</td>
                    <td>1 min 2 sec</td>
                    <td className="edgerack-monospace text-xs">583e51209f2627edc40710a7c20aaeab</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-16 16:51:08</td>
                    <td>1 min 4 sec</td>
                    <td className="edgerack-monospace text-xs">0d4bd2513087f3cd08f409b34f3015e0</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-16 16:30:04</td>
                    <td>1 min 1 sec</td>
                    <td className="edgerack-monospace text-xs">8845b7cccdf4fa95cd8b9629a12af699</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-16 12:24:09</td>
                    <td>1 min 2 sec</td>
                    <td className="edgerack-monospace text-xs">8438217abdddf555d89c16ac40068181</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-12 12:20:39</td>
                    <td>1 min 8 sec</td>
                    <td className="edgerack-monospace text-xs">a102e72da81c201ca1cf664edeb3f84f</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-07 11:03:41</td>
                    <td>1 min 5 sec</td>
                    <td className="edgerack-monospace text-xs">b1495bdf5095741f16acb86f247c817b</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-05 12:01:42</td>
                    <td>1 min 9 sec</td>
                    <td className="edgerack-monospace text-xs">691155f3cabc2a69e13efdc39db62e9f</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-05 11:29:55</td>
                    <td>1 min 1 sec</td>
                    <td className="edgerack-monospace text-xs">175080f13f5cf783723f6cc8c16b616b</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-02-04 23:14:24</td>
                    <td>59 sec</td>
                    <td className="edgerack-monospace text-xs">c42fffbe1eba5a1e7d2790bd62273990</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-01-27 07:55:27</td>
                    <td>59 sec</td>
                    <td className="edgerack-monospace text-xs">ef6205ba4aaa1e1a4e20093d145c8670</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-01-22 09:28:04</td>
                    <td>58 sec</td>
                    <td className="edgerack-monospace text-xs">6fb599f1b3a459decd2dd833bdf9fb0b</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2025-01-13 07:18:35</td>
                    <td>57 sec</td>
                    <td className="edgerack-monospace text-xs">723bb170aa5ac3b0a785206759a840e9</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2024-12-08 23:01:57</td>
                    <td>1 min 6 sec</td>
                    <td className="edgerack-monospace text-xs">1f68ff6eded186a0c0c421cbaff9cd50</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2024-09-27 03:16:35</td>
                    <td>1 min 4 sec</td>
                    <td className="edgerack-monospace text-xs">5beb9fae9eeb31947811fd490e37ac5a</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2024-09-19 06:16:51</td>
                    <td>1 min 4 sec</td>
                    <td className="edgerack-monospace text-xs">4835a578e405a659b9e2ef28200f93e6</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2024-09-05 12:35:17</td>
                    <td>49 sec</td>
                    <td className="edgerack-monospace text-xs">fd86ba4598c1fef483755c893f7c0fab</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2024-09-05 11:25:22</td>
                    <td>55 sec</td>
                    <td className="edgerack-monospace text-xs">b129753f6ece51916d63970b61d2fae3</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                  <tr>
                    <td className="edgerack-monospace">2020-09-19 20:47:20</td>
                    <td>1 min 5 sec</td>
                    <td className="edgerack-monospace text-xs">f4909f580ea605a2ab3195f7b983fafb</td>
                    <td><Badge className="status-badge-on">success</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}