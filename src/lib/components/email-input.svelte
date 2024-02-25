<!-- NeonEmailInput.svelte -->
<script>
    
    export let email = '';
    export const placeholder = '';
    export const value = ''; // Bindable value

  </script>
  
  <input type="email" bind:value={email} placeholder="Enter your email" />
  
  <style>
    /* Neon styling goes here, similar to NeonTextInput */
  </style>
  