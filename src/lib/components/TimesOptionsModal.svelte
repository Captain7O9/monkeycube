<script lang="ts">
	import { Modal } from '$lib/components/index';
	import { MUTATIONS } from '$lib/queries';
	import { formatTimeToString } from '$lib/utils.js';
	import { localTimes } from '$lib/stores';

	let {
		timeId,
		handleClose
	}: {
		timeId: number;
		handleClose: () => void;
	} = $props();

	let time = $derived(localTimes.time(timeId));

	function handleKeyDown(event: KeyboardEvent) {
		if (event.code === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<Modal>
	<div class="modal-wrapper">
		<div class="time">
			<span class="true-time"
				>{formatTimeToString(time.isPlusTwo ? time.time + 2000 : time.time)}</span
			>
			{#if time.isPlusTwo}
				<div class="separator"></div>
				<span
					>{formatTimeToString(time.time)}<span style="color: var(--error-color);">+2</span></span
				>
			{/if}
			{#if time.isDNF}
				<div class="separator"></div>
				<span style="color: var(--error-color);">DNF</span>
			{/if}
		</div>

		<div class="scramble">{time.scramble}</div>

		<div class="options">
			<button
				class="plus-two"
				onclick={async () => {
					await MUTATIONS.time.handleToggle(time.id, 'isPlusTwo', time.isPlusTwo);
					await localTimes.sync();
				}}
				class:toggled={time.isPlusTwo}
				><i class="fa-solid fa-clock"></i>+2
			</button>
			<button
				class="dnf"
				onclick={async () => {
					await MUTATIONS.time.handleToggle(time.id, 'isDNF', time.isDNF);
					await localTimes.sync();
				}}
				class:toggled={time.isDNF}
				><i class="fa-solid fa-flag"></i>dnf
			</button>
			<button
				class="delete"
				onclick={async () => {
					await MUTATIONS.time.handleDelete(time.id);
					handleClose();
					await localTimes.sync();
				}}
				><i class="fa-solid fa-trash-can"></i>delete
			</button>
		</div>
		<button class="close" onclick={handleClose}>Done</button>
	</div>
</Modal>

<style>
	.modal-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.time {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;

		.separator {
			align-self: center;
			width: 0.5rem;
			height: 1em;
			border-radius: var(--border-radius);
			background-color: var(--sub-alt-color);
		}
	}

	.scramble {
		height: 2.5rem;
	}

	.options {
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);
		display: flex;
		justify-content: space-between;
		margin-bottom: auto;
		font-size: 0.75em;
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

	.delete:hover {
		color: var(--error-color);
	}

	.toggled {
		color: var(--main-color);
		&:hover {
			color: var(--main-color);
		}
	}

	.close {
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);
		height: 40px;

		&:hover {
			background-color: var(--sub-color);
			color: var(--background-color);
		}
	}
</style>
