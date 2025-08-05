<template>
    <main class="container text-white">
        <div class="relative overflow-x-auto w-1/2">
            <h1 class="m-4">Real Time Network Data:</h1>
            <table class="w-1/2 rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            Return Air Temperature
                        </th>
                        <td class="px-6 py-4">
                            25 C
                        </td>
                    </tr>
                    <tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            Return Air Humidity
                        </th>
                        <td class="px-6 py-4">
                            15%
                        </td>
                    </tr>
                    <tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            Supply Air Temperature
                        </th>
                        <td class="px-6 py-4">
                            12 C
                        </td>
                    </tr>
                    <tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            Supply Air Humidity
                        </th>
                        <td class="px-6 py-4">
                            34%
                        </td>
                    </tr>
                    <tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            Internal Fan
                        </th>
                        <td class="px-6 py-4">
                            920 RPM
                        </td>
                    </tr>
                    <tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            External Fan
                        </th>
                        <td class="px-6 py-4">
                            1550 RPM
                        </td>
                    </tr>
                    <tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            Condenser
                        </th>
                        <td class="px-6 py-4">
                            1100 RPM
                        </td>
                    </tr>

                </tbody>
            </table>
       </div>
    </main>
</template>

<script setup>

</script>

