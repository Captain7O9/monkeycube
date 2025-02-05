<script lang="ts">
  import TimesTable from '$lib/components/TimesTable.svelte';
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/user.svelte';
  import type { Time } from '$lib/types';
  import { styles } from '$lib/style.svelte';

  let { data } = $props();

  let username = $derived(data.username);
  let usernameInput = $state('');

  let table = $state<TimesTable>();

  let maxRows = $state(10);

  let chartData: Time[] = $state([]);

  let chart: Chart;
  let chartCanvas = $state<HTMLCanvasElement>();

  async function onTableLoad() {
    console.log('Table loaded');
    chartData = await user.time.fetchMany(username);
    if (chart) {
      chart.data = {
        labels: chartData.map((time) => new Date(time.date ?? 0).toLocaleDateString()),
        datasets: [
          {
            label: 'Times',
            backgroundColor: styles.current['--main-color'],
            borderColor: styles.current['--main-color'],
            data: chartData.map((time) => time.time)
          }
        ]
      };
    }
    chart?.update('none');
  }

  $effect(() => {
    table?.loadTimes();
  });

  $effect(() => {
    usernameInput = username;
  });

  onMount(async () => {
    table?.loadTimes();
    chartData = await user.time.fetchMany(username);

    const ctx = chartCanvas?.getContext('2d');
    chart = new Chart(ctx ?? '', {
      type: 'line',
      data: {
        labels: chartData.map((time) => new Date(time.date ?? 0).toLocaleDateString()),
        datasets: [
          {
            label: 'Times',
            backgroundColor: styles.current['--main-color'],
            borderColor: styles.current['--main-color'],
            data: chartData.map((time) => time.time)
          }
        ]
      }
    });
  });
</script>

<main class="constrain-width">
  <div>
    <label for="username">Username:</label>
    <input bind:value={usernameInput} type="text" id="username" required />
    <button
      onclick={() => {
        goto(`/user/${usernameInput}`);
      }}
      >Load Times
    </button>
  </div>
  <h1>Times ({username})</h1>
  <div id="times-table">
    <TimesTable bind:this={table} {username} {maxRows} onLoadFunction={onTableLoad} />
    <button
      onclick={() => {
        maxRows += 5;
        table?.loadTimes();
      }}
      class="table-load"
      >load more
    </button>
  </div>
  <div id="time-chart">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
      color: var(--text-color);
    }

    .table-load {
      color: var(--text-color);
      background-color: var(--sub-alt-color);
      padding: 5px;
      width: 100%;
      margin-top: 5px;
      border-radius: var(--border-radius);

      &:hover {
        background-color: var(--text-color);
        color: var(--sub-alt-color);
      }
    }

    canvas {
      margin-top: 10px;
    }
  }
</style>
