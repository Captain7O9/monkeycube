<script lang="ts">
  import TimesTable from '$lib/components/TimesTable.svelte';
  import Chart from 'chart.js/auto';
  import { user } from '$lib/user.svelte';
  import { onMount } from 'svelte';

  let username = $state(user.username);

  let table = $state<TimesTable>();
  let maxRows = $state(10);

  let chartValues = [20, 10, 5, 2, 20, 30, 45];
  let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  let ctx;
  let chartCanvas = $state<HTMLCanvasElement>();

  onMount(() => {
    ctx = chartCanvas?.getContext('2d');
    new Chart(ctx ?? '', {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Revenue',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: chartValues
          }
        ]
      }
    });
  });
</script>

<main class="constrain-width">
  <div id="user-input">
    <h1>Times</h1>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} required />
    <button onclick={table?.loadTimes}>Load Times</button>
  </div>
  <div id="times-table">
    <TimesTable bind:this={table} {username} {maxRows} />
    <button
      onclick={() => {
        maxRows += 5; // Toggle maxRows 0 <-> 10
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
