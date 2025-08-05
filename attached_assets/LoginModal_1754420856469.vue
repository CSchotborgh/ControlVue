<template>
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="header"></slot>
      <slot name="body">
        <!-- Login form goes here -->
        
       Hello Login
      </slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
