<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { formatTime } from '$lib/utils';
	import { TimesTableWidget, RightPanel } from '$lib/components';
	import { Alg } from 'cubing/alg';
	import type { PageProps } from './$types';
	import { MUTATIONS } from '$lib/queries';
	import TimerSettings from './TimerSettings.svelte';
	import ScrambleField from './ScrambleField.svelte';
	import { localTimes } from '$lib/stores';

	const WAIT_TIME = 200;

	let { data }: PageProps = $props();

	const user = data.user;
	console.log('Logging user from +page.svelte', user);

	let time = $state(0); // Time in milliseconds
	let minutes = $derived(formatTime(time).minutes);
	let seconds = $derived(formatTime(time).seconds);
	let decimals = $derived(formatTime(time).decimals);

	let lastTime = $derived(localTimes.last?.time);

	let table = $state<TimesTableWidget>();
	let scramble = $state<ScrambleField>();

	let isRunning = $state(false);
	let currentScramble = $state(new Alg());

	let startTime = 0;
	let keyDownStartTime = 0;
	let canStart = $state(false);
	let progressValue = $state(0);

	let interval: ReturnType<typeof setInterval>;
	let progressInterval: ReturnType<typeof setInterval>;

	let tablePanelHeight = $state(0);

	function onNewScramble(newScramble: Alg) {
		console.log('scramble change');
		currentScramble = newScramble;
	}

	function startTimer() {
		isRunning = true;
		startTime = Date.now();

		interval = setInterval(() => {
			time = Date.now() - startTime;
		}, 10);
	}

	async function stopTimer() {
		clearInterval(interval);
		const previousScramble = currentScramble.toString();
		await scramble?.setNewScramble('333');

		if (!user) {
			isRunning = false;
			return;
		}
		await MUTATIONS.postTime(time, previousScramble, '333');
		await localTimes.sync();
		isRunning = false;
	}

	function onWindowKeyDown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			(document.activeElement as HTMLElement)?.blur();
			if (keyDownStartTime === 0) {
				keyDownStartTime = Date.now();
			}
			if (isRunning) {
				stopTimer();
				keyDownStartTime = 0;
			}
		}
	}

	function onWindowKeyUp(event: KeyboardEvent) {
		if (event.code === 'Space') {
			if (!isRunning && canStart) {
				startTimer();
			}
			keyDownStartTime = 0;
		}
	}

	$effect(() => {
		if (!isRunning && lastTime && lastTime !== time) time = lastTime;
	});

	onMount(async () => {
		// Remove focus on scramble
		(document.activeElement as HTMLElement)?.blur();

		await localTimes.sync();

		progressInterval = setInterval(() => {
			progressValue = keyDownStartTime === 0 ? 0 : Date.now() - keyDownStartTime;
			canStart = progressValue > WAIT_TIME;
		}, 10);
	});
	onDestroy(() => {
		clearInterval(progressInterval);
	});
</script>

<svelte:window onkeydown={onWindowKeyDown} onkeyup={onWindowKeyUp} />
<main>
	{#if !(canStart || isRunning)}
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
		<div class:can-start={canStart} class="timer-text">
			<span class="time">{minutes}{seconds}</span><span class="decimals">
				.{isRunning ? decimals[0] : decimals}</span
			>
		</div>
		<progress class:hidden={isRunning} max={WAIT_TIME} value={isRunning ? WAIT_TIME : progressValue}
		></progress>
	</div>

	<div class="scramble" class:hidden={canStart || isRunning}>
		<ScrambleField bind:this={scramble} autoGenerate={true} {onNewScramble} />
	</div>

	<!--	Get height of time table before it appears to get max height before overflow-->
	<div bind:clientHeight={tablePanelHeight} class="times-table hidden"></div>
</main>

<style lang="scss">
	@mixin panel {
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);
	}

	main {
		display: grid;
		grid-template-rows: min-content 1fr 1fr;
		grid-template-columns: 1fr 1fr minmax(min-content, 1fr) 1fr 1fr;
		flex-grow: 1;
		user-select: none;
		margin: 0 20px;
		overflow: hidden;
		max-height: 100%;

		.can-start {
			color: var(--text-color);
		}

		.times-table {
			@include panel;
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

				.time {
					font-size: 8rem;
				}

				.decimals {
					font-size: 2rem;
				}
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
