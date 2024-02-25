<!-- NeonNumberInput.svelte -->
<script>
    export let number = '';
    export const placeholder = '';
    export const value = ''; // Bindable value
  </script>
  
  <input type="number" bind:value={number} placeholder="Enter a number" />
  
  <style>
    /* Neon styling goes here, similar to NeonTextInput */
  </style>
  