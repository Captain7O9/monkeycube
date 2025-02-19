<script lang="ts">
	import TimesTable from '$lib/components/TimesTable.svelte';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import { styles } from '$lib/stores/style.svelte';

	let { data }: PageProps = $props();

	let username = $state(data.username);
	let usernameInput = $state('');

	let table = $state<TimesTable>();

	let times = $state(data.times);
	let labels = $derived(
		times.map(
			(time) =>
				`${new Date(time.date).toLocaleDateString()} ${new Date(time.date).toLocaleTimeString()}`
		)
	);
	let chartData = $derived(times.map((time) => time.time));

	console.log(times);

	let chart: Chart;
	let chartCanvas = $state<HTMLCanvasElement>();

	$effect(() => {
		usernameInput = username;
	});

	onMount(async () => {
		const ctx = chartCanvas?.getContext('2d');
		chart = new Chart(ctx ?? '', {
			type: 'line',
			data: {
				labels: labels.reverse(),
				datasets: [
					{
						label: 'Times',
						backgroundColor: styles.current['--main-color'],
						borderColor: styles.current['--main-color'],
						data: chartData.reverse(),
						cubicInterpolationMode: 'monotone'
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
				goto(`/profile/${usernameInput}`);
			}}
			>Load Times
		</button>
	</div>
	<h1>Times ({username})</h1>
	<div id="time-chart">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
	<TimesTable bind:this={table} times={data.times} />
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
