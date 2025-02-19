<script lang="ts">
	import { CubeInstance } from '$lib/cube';
	import type { Alg } from 'cubing/alg';
	import type { Face } from '$lib/types';

	let { scramble }: { scramble: Alg } = $props();
	let cube = $state(new CubeInstance());
	let cubeState = $derived(cube.reset().doMoves(scramble).state);
</script>

{#snippet CubeFace(face: Face)}
	<div class="face-container">
		{#each face as row}
			{#each row as column}
				<div style:background-color="var(--{column})"></div>
			{/each}
		{/each}
	</div>
{/snippet}

<div class="cube">
	<div class="cube-container">
		{#each cubeState as face, i}
			{#if i === 0 || i === 5}
				<div></div>
			{:else if i === 1}
				<div></div>
				<div></div>
			{/if}

			{@render CubeFace(face)}
		{/each}
	</div>
</div>

<style lang="scss">
	.cube {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.cube-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 5px;
		width: min-content;
	}

	.face-container {
		width: min-content;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 4px;

		div {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: calc(var(--border-radius) / 5);
		}
	}
</style>
