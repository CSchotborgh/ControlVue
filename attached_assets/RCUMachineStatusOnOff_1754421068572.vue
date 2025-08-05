 <!--To create a read-only ON/OFF label for your Vue instance for a class toggle method, you can modify the existing code to include both states and use a dynamic class binding to switch between them based on a boolean value. Here's an updated version of your code that includes both ON and OFF labels:-->

<template>
  <div class="custom-grid border-none dark:rounded-full dark:bg-gray-600">
    <div class="m-auto grid grid-rows-1 gap-4 text-center text-sm table-label">Machine:</div>
    <div class="flex justify-center">
      <div>
        <span :class="[
          isOn ? 'bg-green-100 dark:bg-green-200 text-green-800 dark:text-green-800' : 'bg-blue-100 dark:bg-blue-200 text-blue-800 dark:text-blue-800',
          'mr-2 px-2.5 py-0.5 rounded flex items-center justify-center'
        ]">
          {{ isOn ? 'ON' : 'OFF' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOn: false // Set this to true for ON state, false for OFF state
    }
  }
}

</script>

 <!--add a data property isOn to control the state of the label.
The span element now uses a dynamic class binding (:class) to change its appearance based on the isOn value.
The text inside the span is now dynamically set using {{ isOn ? 'ON' : 'OFF' }}.
To make this a read-only label:
Ensure that isOn is only changed programmatically within your component or by passing it as a prop from a parent component.
Don't add any click handlers or other user interactions to toggle the state.
You can control the state by setting isOn to true or false as needed in your component's logic. For example, you might set it based on data received from an API or as a prop passed from a parent component.
If you want to pass the state as a prop from a parent component, you can modify the component like this:
-->

<template>
  <!-- ... (same as above) ... -->
</template>

<script>
export default {
  props: {
    isOn: {
      type: Boolean,
      default: false
    }
  }
}
</script>

/**Then in the parent component, you would use it like this:**/

<template>
  <MachineStatus :isOn="machineIsOn" />
</template>

<script>
import MachineStatus from './MachineStatus.vue'

export default {
  components: {
    MachineStatus
  },
  data() {
    return {
      machineIsOn: false // Control this value as needed
    }
  }
}
</script>