<script lang="ts">
	import { fly } from 'svelte/transition';
	import { MUTATIONS } from '$lib/queries';
	import { localTimes, userData } from '$lib/stores';

	let {
		setScramble
	}: {
		setScramble?: (event: string) => Promise<void>;
	} = $props();

	let currentTime = $derived(localTimes.last);
	const after = localTimes.sync;
</script>

<div class="timer-settings" transition:fly={{ y: '-500%' }}>
	<button
		class="plus-two"
		onclick={() => {
			MUTATIONS.time.handleToggle(currentTime.id, 'isPlusTwo', currentTime.isPlusTwo, after);
		}}
		class:toggled={currentTime?.isPlusTwo}
		><i class="fa-solid fa-clock"></i>+2
	</button>
	<button
		class="dnf"
		onclick={() => {
			MUTATIONS.time.handleToggle(currentTime.id, 'isDNF', currentTime.isDNF, after);
		}}
		class:toggled={currentTime?.isDNF}
		><i class="fa-solid fa-flag"></i>dnf
	</button>
	<div class="separator"></div>
	<button
		class="scramble-reset"
		onclick={() => {
			setScramble?.('333');
		}}
	>
		<i class="fa-solid fa-arrow-rotate-back"></i>scramble
	</button>
	<button
		class:toggled={userData.settings.inspection}
		onclick={() => {
			userData.settings.inspection = !userData.settings.inspection;
		}}><i class="fa-solid fa-magnifying-glass"></i>inspection</button
	>
	<div class="separator"></div>
	<button
		class="delete"
		onclick={() => {
			MUTATIONS.time.handleDelete(currentTime.id, after);
		}}
		><i class="fa-solid fa-trash-can"></i>delete
	</button>
</div>

<style lang="scss">
	.timer-settings {
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);

		display: flex;
		justify-content: space-between;
		grid-area: 1 / 3 / 2 / 4;
		font-size: 0.75em;

		.delete:hover {
			color: var(--error-color);
		}

		button {
			padding: 1em;
			display: inline-flex;
			align-items: baseline;

			i {
				padding-right: 0.5em;
			}

			&:hover {
				color: var(--text-color);
			}
		}

		.toggled {
			color: var(--main-color);

			&:hover {
				color: var(--main-color);
			}
		}

		.separator {
			align-self: center;
			width: 0.5em;
			height: 2em;
			border-radius: 3px;
			background-color: var(--background-color);
		}
	}
</style>
