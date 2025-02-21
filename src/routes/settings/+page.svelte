<script lang="ts">
	import { themes } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import type { Theme } from '$lib/types';
	type ThemeCardProps = [string, Theme];

	let customTheme = $state(themes.custom);

	function applyStyles() {
		console.log('applying styles');
		let replaceTo = '';
		for (const [key, value] of Object.entries(customTheme)) {
			replaceTo += `${key}: ${value}; `;
		}

		document.querySelector('body')?.setAttribute('style', replaceTo);
	}

	// Only previewing the changes, not applying them to the db
	$effect(() => {
		if (themes.name === 'custom') applyStyles();
	});

	onMount(() => {
		customTheme = themes.custom;
	});
	onDestroy(themes.apply);
</script>

{#snippet themeCard(theme: ThemeCardProps)}
	{@const [key, value] = theme}
	<button
		class:selected={themes.name === key}
		style:--background-color={value['--background-color']}
		style:--main-color={value['--main-color']}
		style:--sub-color={value['--sub-color']}
		style:--sub-alt-color={value['--sub-alt-color']}
		style:--text-color={value['--text-color']}
		style:--error-color={value['--error-color']}
		onclick={() => {
			themes.set({ name: key });
		}}
		><span class="title">{key}</span><span
			class="color-preview"
			style:background-color={value['--main-color']}
		></span><span class="color-preview" style:background-color={value['--sub-color']}></span><span
			class="color-preview"
			style:background-color={value['--sub-alt-color']}
		></span><span class="color-preview" style:background-color={value['--text-color']}></span><span
			class="color-preview"
			style:background-color={value['--error-color']}
		></span></button
	>
{/snippet}

<main class="constrain-width">
	<h1>Colors</h1>
	<section class="theme">
		<div class="setting">
			<div class="switch">
				<button
					class:selected={themes.name !== 'custom'}
					onclick={() => {
						themes.set({ name: 'serika dark' });
					}}>presets</button
				><button
					class:selected={themes.name === 'custom'}
					onclick={() => {
						themes.set({ name: 'custom' });
					}}>custom</button
				>
			</div>
			{#if themes.name === 'custom'}
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
					><button
						onclick={() => {
							themes.set({ name: 'custom', custom: themes.availableThemes['serika dark'] });
							customTheme = themes.custom;
						}}>Reset</button
					>
				</div>
			{:else}
				<div class="presets">
					{#each Object.entries(themes.availableThemes) as theme}
						{@render themeCard(theme)}
					{/each}
				</div>
			{/if}
		</div>

		<!--  Note: Styles will auto apply onDestroy, but not on page refresh/leave-->
	</section>
</main>

<style lang="scss">
	.theme {
		display: grid;
		grid-template-columns: 1fr min-content;
		gap: 10px;

		.switch {
			width: 100%;
			display: flex;
			margin-bottom: 10px;
			box-sizing: border-box;
			gap: 10px;

			button {
				flex: 1;
				padding: 10px;
				color: var(--text-color);
				background-color: var(--sub-alt-color);
				border-radius: var(--border-radius);
			}

			.selected {
				color: var(--sub-alt-color);
				background-color: var(--main-color);
			}
		}

		.setting {
			.presets {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
				gap: 10px;

				button {
					display: flex;
					gap: 0.5em;
					align-items: center;
					padding: 10px;
					color: var(--main-color);
					background-color: var(--background-color);
					border-radius: var(--border-radius);

					.color-preview {
						display: inline-block;
						width: 1.2em;
						height: 1.2em;
						border-radius: var(--border-radius);
					}
				}

				.selected {
					outline: solid var(--main-color);
				}

				.color-preview:nth-child(2) {
					margin-left: auto;
				}
			}

			.color-controls {
				section {
					display: flex;
					width: 100%;
					justify-content: space-between;
				}
			}
		}
	}
</style>
