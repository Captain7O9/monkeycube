<script lang="ts">
  import { fetchTimes } from '$lib/api';
  import type { time } from '$lib/types';
  import { formatTime } from '$lib/utils';

  let times: time[] = [];
  let error = '';
  let username = '';

  async function loadTimes() {
    error = '';
    try {
      times = await fetchTimes(username);
      times.sort((a, b) => a.date - b.time);
      // eslint-disable-next-line
    } catch (err: any) {
      error = err.message;
    }
  }
</script>

<main>
  <h1>Times</h1>
  <label for="username">Username:</label>
  <input type="text" id="username" bind:value={username} required />

  <button on:click={loadTimes}>Load Times</button>

  {#if error}
    <p style="color: red;">{error}</p>
  {/if}
  <table>
    <thead>
      <tr>
        <th>time</th>
        <th>event</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      {#each times as time}
        <tr>
          <td>{formatTime(time.time)}</td>
          <td>{time.event}</td>
          <td>{new Date(time.date).toLocaleDateString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
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
</style>
