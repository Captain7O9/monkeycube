<script lang="ts">
  import type { Time } from '$lib/types';
  import { formatTimeToString } from '$lib/utils';
  import { user } from '$lib/user.svelte';
  import ToolTip from '$lib/components/ToolTip.svelte';

  let {
    username = user.isLoggedIn() ? user.username : '',
    onLoadFunction = () => {},
    since = 0,
    maxRows = 0,
    maxHeight = 0
  }: {
    username?: string;
    onLoadFunction?: () => void;
    since?: number;
    maxRows?: number;
    maxHeight?: number;
  } = $props();

  let times: Time[] = $state([]);
  let error: string = $state('');
  let height = $state(0);

  export async function loadTimes() {
    error = '';
    try {
      times = await user.time.fetchMany(username, since);
      times.sort((a, b) => (a.date ?? 0) - (b.time ?? 0));

      if (maxHeight > 0) {
        const spliceTo = Math.floor(maxHeight / height - 0.5);
        console.info(`Limit to ${spliceTo} rows`);
        times = times.splice(0, spliceTo);
      } else if (maxRows > 0) {
        times = times.splice(0, maxRows);
      }
      onLoadFunction();
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
    await user.time.updateOne({ _id: timeId, [option]: !currentStatus });
    await loadTimes();
  }

  async function handleDelete(time: Time) {
    await user.time.deleteOne(time._id ?? '');
    await loadTimes();
  }

  if (username) {
    loadTimes();
  }
</script>

{#if error}
  <p style="color: red;">{error}</p>
{/if}
<table>
  <thead>
    <tr>
      <th class="time">time</th>
      <th class="date">date</th>
      <th class="options">options</th>
    </tr>
  </thead>
  <tbody>
    {#if times.length === 0}
      <tr bind:clientHeight={height}>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    {/if}
    {#each times as time}
      <tr bind:clientHeight={height}>
        <td class="time">{formatTimeToString(time.time)}</td>
        <td class="date">{new Date(time.date ?? 0).toLocaleDateString()}</td>
        <td class="options">
          <button
            onclick={() => {
              handleToggle(time._id, 'plus_two', time.plus_two);
            }}
            class:toggled={time.plus_two}
            aria-label="+2"
            class="setting"
          >
            <ToolTip content="+2">
              <i class="fa-solid fa-clock"></i></ToolTip
            ></button
          >
          <button
            onclick={() => {
              handleToggle(time._id, 'dnf', time.dnf);
            }}
            class:toggled={time.dnf}
            aria-label="dnf"
            class="setting"
          >
            <ToolTip content="dnf">
              <i class="fa-solid fa-flag"></i>
            </ToolTip>
          </button>
          <button
            onclick={async () => {
              await handleDelete(time);
            }}
            aria-label="Delete"
            class="delete-button"
          >
            <ToolTip content="delete">
              <i class="fa-solid fa-trash-can"></i></ToolTip
            ></button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .toggled {
    color: var(--main-color);
  }

  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    table-layout: fixed;
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
  tbody tr:nth-child(even) td {
    background-color: var(--bg-color);
  }
  th:first-child,
  td:first-child {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
  th:last-child,
  td:last-child {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: var(--bg-color);
  }

  .options {
    color: var(--sub-color);
    width: 65px;
  }

  .delete-button:hover {
    color: var(--error-color);
  }

  .setting:hover {
    color: var(--text-color);
  }
</style>
