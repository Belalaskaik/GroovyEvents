<!-- Input.svelte -->
<script>
    export let placeholder = ''; // Default placeholder text
    export let value = ''; // Bindable value
  </script>
  
  <input type="text" bind:value {placeholder} />
  
  <style>
    input {
      background: #111;
      border: none;
      padding: 12px;
      border-radius: 5px;
      color: #0f0;
      font-size: 16px;
      box-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #0f0, 0 0 35px #0f0;
      outline: none;
      margin: 10px 0;
      width: calc(100% - 24px); /* Adjust width as needed, accounting for padding */
    }
  
    input::placeholder {
      color: #0f0;
      opacity: 0.5;
    }
  
    input:focus {
      box-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #3f3, 0 0 35px #3f3, 0 0 40px #3f3, 0 0 50px #3f3, 0 0 75px #3f3;
    }
  </style>
  