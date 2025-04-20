<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { formatTime } from '$lib/utils';
	import TimerSettings from './TimerSettings.svelte';
	import ScrambleField from './ScrambleField.svelte';
	import TimesTableWidget from './TimesTableWidget.svelte';
	import RightPanel from './RightPanel.svelte';

	import type { PageProps } from './$types';
	import { Alg } from 'cubing/alg';
	import { MUTATIONS } from '$lib/queries';
	import { localTimes, userData } from '$lib/stores';

	const WAIT_TIME = 200; // Official: 550

	let { data }: PageProps = $props();

	const user = data.user;
	console.log('Logging user from +page.svelte', user);

	let currentTime = $state(Date.now());
	let lastTime = $derived(localTimes.last?.time);

	let inspectionStartTime = $state(0);
	let inspectionTime = $derived(inspectionStartTime !== 0 ? currentTime - inspectionStartTime : 0);

	let keyDownStartTime = $state(0);
	let keyDownTime = $derived(keyDownStartTime !== 0 ? currentTime - keyDownStartTime : 0);

	let timerStartTime = $state(0);
	let timerTime = $derived(timerStartTime !== 0 ? currentTime - timerStartTime : 0);

	let currentScramble = $state(new Alg());

	let tablePanelHeight = $state(0);

	let stage = $state<'default' | 'inspection' | 'running'>('default');
	let canStart = $derived(stage !== 'running' && keyDownTime >= WAIT_TIME);

	let displayedTime = $derived(
		Math.max(
			stage === 'running'
				? timerTime
				: stage === 'inspection'
					? Math.ceil(15 - inspectionTime / 1_000) * 1_000
					: (lastTime ?? 0),
			0
		)
	);

	let table = $state<TimesTableWidget>();
	let scramble = $state<ScrambleField>();

	async function onNewScramble(scramble: Alg) {
		currentScramble = scramble;
	}

	function startTimer() {
		stage = 'running';
		inspectionStartTime = 0;
		timerStartTime = Date.now();
	}
	async function stopTimer() {
		if (user) {
			await MUTATIONS.time.post(timerTime, currentScramble.toString(), '333');
			await localTimes.sync();
		}

		stage = 'default';
		timerStartTime = 0;
	}

	function startInspection() {
		stage = 'inspection';
		inspectionStartTime = Date.now();
	}
	function stopInspection() {
		stage = 'default';
	}

	function handleSpaceDown() {
		switch (stage) {
			case 'running':
				stopTimer();
				break;
		}
	}
	function handleSpaceUp() {
		switch (stage) {
			case 'default':
				if (userData.settings.inspection && canStart) {
					startInspection();
				} else {
					if (canStart) startTimer();
				}
				break;
			case 'inspection':
				if (canStart) startTimer();
				break;
		}
	}

	function onWindowKeyDown(event: KeyboardEvent) {
		switch (event.code) {
			case 'Space':
				handleSpaceDown();
				if (!keyDownStartTime) keyDownStartTime = Date.now();
				break;
			case 'Escape':
				if (stage === 'inspection') stopInspection();
		}
	}
	function onWindowKeyUp(event: KeyboardEvent) {
		switch (event.code) {
			case 'Space':
				handleSpaceUp();
				keyDownStartTime = 0;

				break;
		}
	}

	onMount(() => {
		(document.activeElement as HTMLElement)?.blur();
		setInterval(() => {
			currentTime = Date.now();
		}, 10);
	});
</script>

<svelte:window onkeydown={onWindowKeyDown} onkeyup={onWindowKeyUp} />

{#snippet timeSnippet()}
	<div class:can-start={canStart} class="timer-text">
		{#if stage === 'running'}
			<span class="time"
				>{formatTime(displayedTime).minutes}{formatTime(displayedTime).seconds}</span
			><span class="decimals">
				.{formatTime(displayedTime).decimals[0]}
			</span>
		{:else if stage === 'inspection'}
			<span class="time">{formatTime(displayedTime).seconds}</span>
		{:else if stage === 'default'}
			<span class="time"
				>{formatTime(displayedTime).minutes}{formatTime(displayedTime).seconds}</span
			><span class="decimals">
				.{formatTime(displayedTime).decimals}
			</span>
		{/if}
	</div>
{/snippet}

<main>
	{#if !(canStart || stage === 'running' || stage === 'inspection')}
		<div class="times-table" transition:fly={{ x: '-100%', duration: 400 }}>
			<TimesTableWidget bind:this={table} maxHeight={tablePanelHeight} />
			<a href="/profile">show all</a>
		</div>

		<TimerSettings setScramble={scramble?.setNewScramble} />

		<div class="right-panel-container" transition:fly={{ x: '100%' }}>
			<RightPanel scramble={currentScramble} />
		</div>
	{:else}
		<!--Workaround to transition:fly making the element disappear from the DOM-->
		<div class="timer-settings-placeholders hidden">
			<button class="setting">placeholder</button>
		</div>
	{/if}

	<div class="timer">
		{@render timeSnippet()}
		<progress class:hidden={stage === 'running'} max={WAIT_TIME} value={keyDownTime}></progress>
	</div>

	<div class="scramble" class:hidden={canStart || ['running', 'inspection'].includes(stage)}>
		<ScrambleField bind:this={scramble} autoGenerate={true} {onNewScramble} />
	</div>

	<!--	Get height of time table before it appears to get max height before overflow-->
	<div bind:clientHeight={tablePanelHeight} class="times-table hidden"></div>
</main>

<style>
	main {
		display: grid;
		grid-template-rows: min-content 1fr 1fr;
		grid-template-columns: 1fr 1fr minmax(min-content, 1fr) 1fr 1fr;
		flex-grow: 1;
		user-select: none;
		margin: 0 20px;
		overflow: hidden;
		max-height: 100%;
	}

	.can-start {
		color: var(--text-color);
	}

	.times-table {
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		grid-area: 1 / 1 / 4 / 2;
		padding: 5px;

		a {
			background-color: var(--background-color);
			border-radius: var(--border-radius);
			text-align: center;
		}

		a:hover {
			background-color: var(--sub-color);
			color: var(--background-color);
			text-align: center;
		}
	}

	.timer {
		align-self: end;
		padding-bottom: 35px;
		grid-area: 2 / 2 / 3 / 5;
		display: flex;
		flex-direction: column;
		align-items: center;

		.timer-text {
			transition: color 400ms;
			margin-left: -0.5em;
		}

		.time {
			font-size: 8rem;
		}

		.decimals {
			font-size: 2rem;
		}

		progress {
			width: clamp(200px, 10vw, 300px);
			height: 5px;
			border-radius: 3px;
			border: none;
			background: var(--sub-alt-color);
		}

		progress::-moz-progress-bar {
			border: none;
			border-radius: 3px;
			background: var(--main-color);
		}

		progress::-webkit-progress-value {
			border: none;
			border-radius: 3px;
			background: var(--main-color);
		}

		progress::-webkit-progress-bar {
			border: none;
			border-radius: 3px;
			background: var(--sub-alt-color);
		}
	}

	.scramble {
		grid-area: 3 / 2 / 4 / 5;
		transition: opacity 100ms;
		text-align: center;
		margin: 1vh auto;
		font-size: 1.5rem;
		width: 100%;
	}

	.timer-settings-placeholders {
		display: flex;
		grid-area: 1 / 3 / 2 / 4;
		font-size: 0.75em;

		button {
			padding: 1em;
		}
	}

	.right-panel-container {
		grid-area: 1 / 5 / 5 / 6;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
