<script lang="ts">
	import { Alg } from 'cubing/alg';
	import { Cube } from '$lib/components';
	import { formatTimeToString, getAverage } from '$lib/utils';
	import { localTimes } from '$lib/stores';

	let { scramble }: { scramble: Alg } = $props();
</script>

<div class="stats-container">
	<div class="info card">
		PB
		<h1>
			{formatTimeToString(localTimes.sinceSessionStart.sort((a, b) => a.time - b.time)[0]?.time) ||
				'-'}
		</h1>
	</div>
	<div class="info card">
		ao5
		<h1>
			{formatTimeToString(
				Math.round(getAverage({ of: 5, times: localTimes.sinceSessionStart, index: 0 }))
			) || '-'}
		</h1>
	</div>
	<div class="info card">
		ao12
		<h1>
			{formatTimeToString(
				Math.round(getAverage({ of: 12, times: localTimes.sinceSessionStart, index: 0 }))
			) || '-'}
		</h1>
	</div>
	<div class="info card">
		ao100
		<h1>
			{formatTimeToString(
				Math.round(getAverage({ of: 100, times: localTimes.sinceSessionStart, index: 0 }))
			) || '-'}
		</h1>
	</div>
	<div class="graph card">
		graph
		<h1>graph</h1>
	</div>

	<div class="cube-preview card">
		<Cube scramble={new Alg(scramble)} />
	</div>
</div>

<style>
	.stats-container {
		height: 100%;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
		grid-template-rows: repeat(auto-fit, auto);
		gap: 5px;
	}

	.card {
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);
		text-align: center;
	}

	.graph {
		grid-column: span 2;
		grid-row: span 5;
	}

	.cube-preview {
		grid-column: span 2;
		display: flex;
		justify-content: center;
		padding: 10px;
	}
</style>
