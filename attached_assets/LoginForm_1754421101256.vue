<template>
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="header">
        <h2>Login</h2>
      </slot>
      <slot name="body">
        <LoginForm />
      </slot>
      <slot name="footer">
        <button @click="closeModal">Close</button>
      </slot>
    </div>
  </div>
</template>

<script>
import LoginForm from './views/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  methods: {
    closeModal() {
      // Emit close event to parent component
      this.$emit('close')
    }
  }
}
</script>