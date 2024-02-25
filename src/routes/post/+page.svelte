<script>
  import NeonTextInput from '$lib/components/Input.svelte';
  import NeonButton from '$lib/components/Button.svelte';
  import { goto } from '$app/navigation';

  let event = {
    name: '',
    date: '',
    location: '',
    description: ''
  };

  async function submitEvent() {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (response.ok) {
      // Redirect to a confirmation page or clear the form
      event = { name: '', date: '', location: '', description: '' };
      goto('/events'); // Navigate to the events listing page
    } else {
      // Handle errors, such as displaying an error message to the user
      console.error('Event creation failed:', await response.json());
    }
  }
</script>

<form on:submit|preventDefault={submitEvent}>
  <NeonTextInput placeholder="Event Name" bind:value={event.name} />
  <NeonTextInput placeholder="Event Date" bind:value={event.date} />
  <NeonTextInput placeholder="Location" bind:value={event.location} />
  <NeonTextInput placeholder="Description" bind:value={event.description} />
  <NeonButton text="Submit Event" on:click={submitEvent} />
</form>
