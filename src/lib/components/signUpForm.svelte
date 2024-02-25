<script>
    import NeonButton from '$lib/components/Button.svelte';
    import NeonTextInput from '$lib/components/Input.svelte';
    import NeonEmailInput from '$lib/components/email-input.svelte';
    import NeonNumberInput from '$lib/components/number-input.svelte';
  
    let club = {
      name: '',
      email: '',
      members: '', // This will be a string to be compatible with NeonNumberInput
      description: '',
      password: '' // Added password field to match the server expectation
    };
  
    async function registerClub() {
      // Convert members back to a number before sending
      const membersNumber = parseInt(club.members, 10);
      if (isNaN(membersNumber)) {
        console.error('Members count must be a number');
        return;
      }
  
      // Construct the FormData object to send to the server
      const formData = new FormData();
      formData.append('name', club.name);
      formData.append('description', club.description);
      formData.append('password', club.password); // Assume password field is provided correctly
  
      try {
        // Make an API call to your backend
        const response = await fetch('/api/clubs/signups', {
          method: 'POST',
          body: formData // Send the form data
        });
  
        if (response.ok) {
          // Handle success - reset form fields & display a success message
          club = { name: '', email: '', members: '', description: '', password: '' };
          console.log('Club successfully registered!');
          // Optionally, handle navigation or confirmation message
        } else {
          // Handle errors
          const error = await response.json();
          console.error('Registration failed:', error);
        }
      } catch (error) {
        // Handle network errors
        console.error('Registration failed:', error);
      }
    }
  </script>
  
  <form on:submit|preventDefault={registerClub}>
    <NeonTextInput placeholder="Club Name" bind:value={club.name} />
    <NeonEmailInput placeholder="Contact Email" bind:value={club.email} />
    <NeonNumberInput placeholder="Number of Members" bind:value={club.members} />
    <NeonTextInput placeholder="Description" bind:value={club.description} />
    <NeonTextInput placeholder="Password" bind:value={club.password} />
    <NeonButton text="Register Club" />
  </form>
  