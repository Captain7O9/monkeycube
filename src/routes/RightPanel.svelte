<script lang="ts">
	import { Alg } from 'cubing/alg';
	import { Cube } from '$lib/components';

	let { scramble }: { scramble: Alg } = $props();
</script>

<div class="stats-container">
	<div class="info">
		PB
		<h1>35.234</h1>
	</div>
	<div class="info">
		ao5
		<h1>35.234</h1>
	</div>
	<div class="info">
		ao12
		<h1>35.234</h1>
	</div>
	<div class="info">
		ao100
		<h1>35.234</h1>
	</div>
	<div class="graph">
		graph
		<h1>graph</h1>
	</div>

	<div class="cube-preview">
		<Cube scramble={new Alg(scramble)} />
	</div>
</div>

<style lang="scss">
	.stats-container {
		height: 100%;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
		grid-template-rows: repeat(auto-fit, auto);
		gap: 5px;

		div {
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
	}
</style>
