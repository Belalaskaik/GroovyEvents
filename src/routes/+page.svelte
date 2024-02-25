<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData; // populated by Svelte via +page.server.ts!
  let candies = data.candies; // grab the initial value from the server
  let pending = 0; // number of pending requests

  async function addCandy() {
    // Update count locally.
    candies++;

    // Update count on the server.
    pending++;
    await fetch("/api/candies", {
      method: "POST",
      body: JSON.stringify({ candies: 1 }),
    });
    pending--;
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1> Welcome to GroovyEvents </h1>

<h2> Your best place to find events in your school! </h2>

<article class="candies">
  <header>
    <h4>🍭 Candy Shop</h4>
  </header>

  <div>
    <button class:odd={candies % 2} on:click={() => addCandy()}> Click me </button>
    <p>🍬 Candies: {candies}</p>
    <p>⌛ Pending requests: {pending}</p>
  </div>
</article>

<hr />

<footer class="centered">
  <p>🔹 California State University, Fullerton 🔸</p>
</footer>

<style lang="scss">
  .candies div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--pico-spacing);

    @media (max-width: 400px) {
      flex-direction: column;
      align-items: stretch;
    }

    p {
      margin: 0;
    }

    button.odd {
      background-color: var(--pico-secondary);
      border-color: var(--pico-secondary);
    }
  }
  

	:global(body) {
		background-color: #ab47bc;
		color: #0084f6;
		transition: background-color 0.3s;
    padding: 0 0 1000px 0;

	}
	:global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}
</style>

