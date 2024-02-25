<script>
  import Icon from "$lib/components/Icon.svelte";
  import { page } from "$app/stores";

  // Function to scroll to the footer
  function scrollToFooter() {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // List of navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Content", href: "/content" },
    // Add an 'About Us' navItem with a special click handler
    { label: "About Us", href: "#", action: scrollToFooter },
  ];
</script>


<nav>
  <ul class="left">
    <li>
      <a href="/" class:active={$page.url.pathname == "/"}>
        <Icon icon="home" />
      </a>
    </li>
  </ul>

  <ul class="right">
    {#each navItems.filter((item) => item.href != "/") as item}
      <li>
        <a href={item.href} class:active={$page.url.pathname == item.href}>
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  a[href] {
    color: var(--pico-secondary);
  }

  a[href].active {
    color: var(--pico-primary);
    font-weight: bold;
  }
</style>
