<script lang="ts">
	import type { TopFace } from '$lib/types';

	interface Props {
		alg: {
			attributes: {
				name: string;
				group: string;
				alg: string;
			};
			icon: TopFace;
		};
	}

	let { alg }: Props = $props();
</script>

{#snippet face(algIcon: TopFace)}
	<div class="face-container">
		{#each algIcon as row, y}
			{#each row as color, x}
				{#if !color}
					<div></div>
				{:else if x === 0 || x === 4}
					<div class="side-x" style:background-color="var(--{color})"></div>
				{:else if y === 0 || y === 4}
					<div class="side-y" style:background-color="var(--{color})"></div>
				{:else}
					<div class="middle" style:background-color="var(--{color})"></div>
				{/if}
			{/each}
		{/each}
	</div>
{/snippet}

<div class="alg-card">
	{@render face(alg.icon)}
	<div class="separator"></div>
	<div class="attributes">
		{#each Object.entries(alg.attributes) as [key, value]}
			<span class="key">{key}:</span> <span class="value">{value}</span>
		{/each}
	</div>
</div>

<style>
	.alg-card {
		min-width: fit-content;
		display: flex;
		gap: 10px;
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);
		text-wrap: nowrap;
		padding: 10px;

		.attributes {
			height: fit-content;
			display: grid;
			grid-template-areas:
				'key value'
				'key value'
				'key value';
			gap: 4px;

			.key {
				text-align: right;
			}

			.value {
				text-align: left;
				color: var(--text-color);
			}
		}

		.face-container {
			--empty: var(--background-color);

			height: min-content;
			width: min-content;
			display: grid;
			grid-template-columns: min-content repeat(3, 1fr) min-content;
			grid-template-rows: min-content repeat(3, 1fr) min-content;
			gap: 4px;

			div {
				border-radius: calc(var(--border-radius) / 4);
			}

			.side-y {
				width: 1.5rem;
				height: 0.3rem;
			}

			.side-x {
				height: 1.5rem;
				width: 0.3rem;
			}

			.middle {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}
</style>
