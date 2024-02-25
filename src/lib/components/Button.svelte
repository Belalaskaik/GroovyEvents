<!-- NeonButton.svelte -->
<script>
    export let text = 'Neon Button'; // Default button text
    export let onClick = () => {}; // Default click handler
  </script>
  
  <button on:click={onClick}>
    {text}
  </button>
  
  <style>
    button {
      padding: 12px 36px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: #111;
      color: #f50057;
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      outline: none;
      position: relative;
      box-shadow: 0 0 10px #f50057, 0 0 20px #f50057, 0 0 30px #f50057, 0 0 40px #ff0080, 0 0 70px #ff0080, 0 0 80px #ff0080, 0 0 100px #ff0080, 0 0 150px #ff0080;
      transition: all 0.3s ease-in-out;
    }
  
    button:hover {
      box-shadow: 0 0 5px #f50057, 0 0 10px #f50057, 0 0 15px #f50057, 0 0 20px #ff0080, 0 0 35px #ff0080, 0 0 40px #ff0080, 0 0 50px #ff0080, 0 0 75px #ff0080;
    }
  </style>
  