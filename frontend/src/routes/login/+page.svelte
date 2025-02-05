<script lang="ts">
  import { user } from '$lib/user.svelte.js';

  let username = $state('');
  let password = $state('');
  let error = $state('');

  async function handleLogin() {
    error = '';
    console.log(username, password);
    try {
      await user.login(username, password);
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = 'An unknown error occurred';
      }
    }
  }
</script>

<main class="constrain-width">
  <h1>Login</h1>
  {#if error}
    <p style="color: red;">{error}</p>
  {/if}

  <form onsubmit={handleLogin}>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} />

    <button type="submit">Login</button>
  </form>

  <button onclick={user.logout}>Logout</button>

  <br />

  <p>Current user: {user.isLoggedIn() ? user.username : 'Not logged in'}</p>
</main>
