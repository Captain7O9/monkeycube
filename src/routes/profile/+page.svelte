<script lang="ts">
	import TimesTable from './TimesTable.svelte';
	import type { Time } from '$lib/server/db/schema';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { themes } from '$lib/stores';
	import { QUERIES } from '$lib/queries';
	import { getAverage } from '$lib/utils';

	let table = $state<TimesTable>();

	let times: Time[] = $state([]);
	async function updateTimes() {
		times = await QUERIES.times.getTimes({
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
	let chartDataAO5 = $derived(times.map((time, i) => getAverage({ of: 5, times, index: i })));
	let chartDataAO12 = $derived(times.map((time, i) => getAverage({ of: 12, times, index: i })));
	let chartDataAO100 = $derived(times.map((time, i) => getAverage({ of: 100, times, index: i })));

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let chart: Chart;
	let chartCanvas = $state<HTMLCanvasElement>();

	function percentageToHex(percentage: number) {
		if (percentage < 0 || percentage > 100) {
			throw new Error('Percentage must be between 0 and 100.');
		}

		const decimalValue = Math.round(percentage * 255);
		return decimalValue.toString(16).padStart(2, '0').toUpperCase();
	}

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
						label: 'times',
						showLine: false,
						backgroundColor: themes.current['--main-color'] + percentageToHex(0.4),
						data: chartData.reverse()
					},
					{
						label: 'ao5',
						borderColor: themes.current['--main-color'] + percentageToHex(0.4),
						backgroundColor: themes.current['--main-color'] + percentageToHex(0.4),
						data: chartDataAO5.reverse(),
						cubicInterpolationMode: 'monotone',
						pointStyle: false
					},
					{
						label: 'ao12',
						borderColor: themes.current['--main-color'] + percentageToHex(0.7),
						backgroundColor: themes.current['--main-color'] + percentageToHex(0.7),
						data: chartDataAO12.reverse(),
						cubicInterpolationMode: 'monotone',
						pointStyle: false
					},
					{
						label: 'ao100',
						borderColor: themes.current['--main-color'] + percentageToHex(1),
						backgroundColor: themes.current['--main-color'] + percentageToHex(1),
						data: chartDataAO100.reverse(),
						cubicInterpolationMode: 'monotone',
						pointStyle: false
					}
				]
			}
		});
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
	}

	h1 {
		color: var(--text-color);
	}

	canvas {
		margin-top: 10px;
	}
</style>
