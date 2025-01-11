<script lang="ts">
  import '$lib/api';
  import { fetchUser, login, logout } from '$lib/api';
  import type { user } from '$lib/types';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let error = '';

  let currentUser: user | null = null;

  async function handleLogin() {
    error = '';
    console.log(username, password);
    try {
      await login(username, password);
      await handleFetchUser();
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = 'An unknown error occurred';
      }
    }
  }

  async function handleLogout() {
    await logout();
    await handleFetchUser();
  }

  async function handleFetchUser() {
    try {
      currentUser = await fetchUser();
    } catch (err) {
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = 'An unknown error occurred';
      }
    }
  }

  onMount(handleFetchUser);
</script>

<main>
  <h1>Login</h1>
  {#if error}
    <p style="color: red;">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleLogin}>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} />

    <button type="submit">Login</button>
  </form>

  <button on:click={handleLogout}>Logout</button>

  <br />

  <button on:click={handleFetchUser}>Fetch User</button>
  <p>Current user: {currentUser ? currentUser?.username : 'Not logged in'}</p>
</main>
