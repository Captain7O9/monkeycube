<script lang="ts">
  import type { Time } from '$lib/server/db/schema';
  import { formatTimeToString } from '$lib/utils';
  import { ToolTip } from '$lib/components/index';

  let {
    onLoadFunction = () => {},
    since = 0,
    maxRows = 0,
    maxHeight = 0,
    displayError = true
  }: {
    username?: string;
    onLoadFunction?: () => void;
    since?: number;
    maxRows?: number;
    maxHeight?: number;
    displayError?: boolean;
  } = $props();

  let times: Time[] = $state([]);
  let error: string = $state('');
  let height = $state(53);

  export async function loadTimes() {
    error = '';
    try {
      if (maxHeight > 0) {
        console.info(`Max height is ${maxHeight}`);
        console.info(`Height is ${height}`);
        const limit = Math.floor(maxHeight / height - 0.5);
        console.info(`Limit to ${limit} rows`);

        const response = await fetch(`api/times?limit=${limit}&since=${since}`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch times');
        }

        times = await response.json();
      } else if (maxRows > 0) {
        const response = await fetch(`api/times?limit=${maxRows}&since=${since}`, {
          method: 'GET'
        });

        times = await response.json();
      }
      onLoadFunction();
      // eslint-disable-next-line
    } catch (err: any) {
      error = err.message;
      times = [];
    }
  }

  async function handleToggle(
    timeId: number,
    option: 'isDNF' | 'isPlusTwo',
    currentStatus: boolean = false
  ) {
    await fetch(`/api/times/${timeId}`, {
      method: 'PATCH',
      headers: {
        'Application-Type': 'application/json'
      },
      body: JSON.stringify({ [option]: !currentStatus })
    });
    await loadTimes();
  }

  async function handleDelete(time: Time) {
    await fetch(`/api/times/${time.id}`, {
      method: 'DELETE'
    });
    await loadTimes();
  }
</script>

{#if error && displayError}
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
    {#each times as time}
      <tr bind:clientHeight={height}>
        <td class="time">{formatTimeToString(time.time)}</td>
        <td class="date">{new Date(time.date ?? 0).toLocaleDateString()}</td>
        <td class="options">
          <button
            onclick={() => {
              handleToggle(time.id, 'isPlusTwo', time.isPlusTwo);
            }}
            class:toggled={time.isPlusTwo}
            aria-label="+2"
            class="setting"
          >
            <ToolTip content="+2">
              <i class="fa-solid fa-clock"></i></ToolTip
            ></button
          >
          <button
            onclick={() => {
              handleToggle(time.id, 'isDNF', time.isDNF);
            }}
            class:toggled={time.isDNF}
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
    {:else}
      <tr bind:clientHeight={height}>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  .toggled {
    color: var(--main-color);
  }

  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    table-layout: fixed;

    th {
      font-weight: normal;
    }

    td {
      padding: 1rem;
    }

    thead th {
      font-size: 0.75rem;
      padding: 0.3rem 1rem;
      position: sticky;
      top: 0;
      background-color: var(--background-color);
    }

    tbody {
      color: var(--text-color);
      tr:nth-child(odd) td {
        background-color: var(--sub-alt-color);
      }
      tr:nth-child(even) td {
        background-color: var(--background-color);
      }
    }

    th,
    td {
      &:first-child {
        border-radius: var(--border-radius) 0 0 var(--border-radius);
      }
      &:last-child {
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
      }
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
  }
</style>
