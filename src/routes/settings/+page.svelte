<script lang="ts">
	import { themes } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';

	let customTheme = $state(themes.currentTheme.values);

	function applyStyles() {
		let replaceTo = '';
		for (const [key, value] of Object.entries(customTheme)) {
			replaceTo += `${key}: ${value}; `;
		}

		document.querySelector('body')?.setAttribute('style', replaceTo);
	}

	$effect(() => {
		applyStyles();
	});

	onMount(() => {
		console.log(themes.currentTheme.values);
		customTheme = themes.currentTheme.values;
		console.log(customTheme);
	});

	onDestroy(themes.apply);
</script>

<main class="constrain-width">
	<h1>Colors</h1>
	<div class="settings">
		<div class="presets">
			<button
				onclick={() => {
					themes.set({ name: 'custom' });
				}}>custom</button
			>
			{#each Object.keys(themes.availableThemes) as preset}
				<button
					onclick={() => {
						themes.set({ name: preset });
					}}>{preset}</button
				>
			{/each}
		</div>
		{#if themes.currentTheme.name === 'custom'}
			<div class="color-controls">
				{#each Object.keys(themes.availableThemes['serika dark']) as key}
					<section>
						<label for={key}>{key}:</label>
						<input type="color" bind:value={customTheme[key]} />
					</section>
				{/each}
				<button
					onclick={() => {
						themes.set({ name: 'custom', custom: customTheme });
					}}>Apply</button
				>
			</div>
		{/if}
	</div>
	<!--  Note: Styles will auto apply onDestroy, but not on page refresh/leave-->
</main>

<style lang="scss">
	h1 {
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);
	}

	.settings {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;

		.color-controls {
			section {
				display: flex;
				width: 100%;
				justify-content: space-between;
			}
		}

		.presets {
			display: flex;
			flex-direction: column;
			align-items: start;
		}
	}
</style>
