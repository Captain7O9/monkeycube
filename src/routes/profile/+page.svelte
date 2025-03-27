<script lang="ts">
	import { TimesTable } from '$lib/components/routes/profile/[[username]]/page';
	import type { Time } from '$lib/server/db/schema';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { themes } from '$lib/stores';
	import { QUERIES } from '$lib/queries';

	let table = $state<TimesTable>();

	let times: Time[] = $state([]);
	async function updateTimes() {
		times = await QUERIES.getTimes({
			limit: 2 ** 10,
			since: 0
		});
	}

	let labels = $derived(
		times.map(
			(time) =>
				`${new Date(time.date).toLocaleDateString()} ${new Date(time.date).toLocaleTimeString()}`
		)
	);
	let chartData = $derived(times.map((time) => time.time));

	let chart: Chart;
	let chartCanvas = $state<HTMLCanvasElement>();

	onMount(async () => {
		await updateTimes();
		console.log(times);

		const ctx = chartCanvas?.getContext('2d');
		chart = new Chart(ctx ?? '', {
			type: 'line',
			data: {
				labels: labels.reverse(),
				datasets: [
					{
						label: 'Times',
						backgroundColor: themes.current['--main-color'],
						borderColor: themes.current['--main-color'],
						data: chartData.reverse(),
						cubicInterpolationMode: 'monotone'
					}
				]
			}
		});
		console.log(chart);
	});
</script>

<main class="constrain-width">
	<h1>Times</h1>
	<div id="time-chart">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
	<TimesTable bind:this={table} {times} onUpdate={updateTimes} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 20px;

		h1 {
			color: var(--text-color);
		}

		canvas {
			margin-top: 10px;
		}
	}
</style>
