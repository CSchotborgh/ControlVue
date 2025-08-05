<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Router Configuration</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Router Configuration</h1>
        
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 class="text-xl font-semibold mb-4">Quick Status</h2>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p><strong>Network Name (SSID):</strong> <span id="ssid">MyHomeNetwork</span></p>
                    <p><strong>Security:</strong> WPA3</p>
                </div>
                <div>
                    <p><strong>Connected Devices:</strong> <span id="connectedDevices">7</span></p>
                    <p><strong>Internet Status:</strong> <span id="internetStatus" class="text-green-600">Connected</span></p>
                </div>
            </div>
        </div>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 class="text-xl font-semibold mb-4">Main Menu</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="showSettings('network')">Network Settings</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="showSettings('security')">Security</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="showSettings('advanced')">Advanced Settings</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="showSettings('admin')">Administration</button>
            </div>
        </div>

        <div id="settingsContent" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hidden">
            <!-- Settings content will be dynamically inserted here -->
        </div>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
            <div class="flex space-x-4">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="rebootRouter()">Reboot Router</button>
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onclick="runSpeedTest()">Run Speed Test</button>
            </div>
        </div>
    </div>

    <script>
        function showSettings(section) {
            const content = document.getElementById('settingsContent');
            content.innerHTML = `<h3 class="text-lg font-semibold mb-2">${section.charAt(0).toUpperCase() + section.slice(1)} Settings</h3>
                                 <p>This is where the ${section} settings would be displayed and configured.</p>`;
            content.classList.remove('hidden');
        }

        function rebootRouter() {
            if (confirm('Are you sure you want to reboot the router?')) {
                alert('Router is rebooting. Please wait a few minutes before reconnecting.');
            }
        }

        function runSpeedTest() {
            alert('Running speed test... This may take a few moments.');
            // Simulating a speed test result after 3 seconds
            setTimeout(() => {
                alert('Speed Test Results:\nDownload: 100 Mbps\nUpload: 20 Mbps\nPing: 15 ms');
            }, 3000);
        }
    </script>
</body>
</html>