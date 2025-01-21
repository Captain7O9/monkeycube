<script lang="ts">
  import type { Time } from '$lib/types';
  import { formatTimeToString } from '$lib/utils';
  import { onMount } from 'svelte';
  import { user } from '$lib/user.svelte';

  let times: Time[] = [];
  let error = '';
  let username = '';

  async function loadTimes() {
    error = '';
    try {
      times = await user.fetchTimes(username);
      times.sort((a, b) => (a.date ?? 0) - (b.time ?? 0));
      // eslint-disable-next-line
    } catch (err: any) {
      error = err.message;
    }
  }

  async function handleToggle(
    timeId: string = '',
    option: 'dnf' | 'plus_two',
    currentStatus: boolean = false
  ) {
    await user.updateTime({ _id: timeId, [option]: !currentStatus });
    await loadTimes();
  }

  onMount(() => {
    username = user.isLoggedIn() ? user.username : '';
    if (username !== '') {
      loadTimes();
    }
  });
</script>

<main>
  <h1>Times</h1>
  <label for="username">Username:</label>
  <input type="text" id="username" bind:value={username} required />

  <button onclick={loadTimes}>Load Times</button>

  {#if error}
    <p style="color: red;">{error}</p>
  {/if}
  <table>
    <thead>
      <tr>
        <th>time</th>
        <th>event</th>
        <th>date</th>
        <th>options</th>
      </tr>
    </thead>
    <tbody>
      {#each times as time}
        <tr>
          <td>{formatTimeToString(time.time)}</td>
          <td>{time.event}</td>
          <td>{new Date(time.date ?? 0).toLocaleDateString()}</td>
          <td class="options">
            <button
              onclick={() => {
                handleToggle(time._id, 'plus_two', time.plus_two);
              }}
              class:toggled={time.plus_two}
              aria-label="+2"
              class="setting"><i class="fa-solid fa-clock"></i></button
            >
            <button
              onclick={() => {
                handleToggle(time._id, 'dnf', time.dnf);
              }}
              class:toggled={time.dnf}
              aria-label="DNF"
              class="setting"
              ><i class="fa-solid fa-ban"></i>
            </button>
            <button
              onclick={async () => {
                await user.deleteTime(time._id ?? '');
                await loadTimes();
              }}
              aria-label="Delete"
              class="delete-button"><i class="fa-solid fa-trash-can"></i></button
            ></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  .toggled {
    color: var(--main-color);
  }

  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  th {
    font-weight: normal;
  }
  td {
    padding: 1rem;
  }
  thead th {
    font-size: 0.75rem;
    padding: 0.3rem 1rem;
  }
  tbody {
    color: var(--text-color);
  }
  tbody tr:nth-child(odd) td {
    background-color: var(--sub-alt-color);
  }
  td:first-child {
    border-radius: 0.7rem 0 0 0.7rem;
  }
  td:last-child {
    border-radius: 0 0.7rem 0.7rem 0;
  }

  .options {
    color: var(--sub-color);
  }

  .delete-button:hover {
    color: var(--error-color);
  }

  .setting:hover {
    color: var(--text-color);
  }
</style>
