<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { convertTime } from '$lib/utils';

  const waitTime = 500;

  let time = $state(0); // Time in milliseconds
  let minutes = $derived(convertTime(time).minutes);
  let seconds = $derived(
    convertTime(time)
      .seconds.toString()
      .padStart(2, minutes > 0 ? '0' : '')
  );
  let decimals = $derived(convertTime(time).milliseconds.toString().padEnd(3, '0'));

  let isRunning = $state(false);

  let startTime = 0;
  let keyDownStartTime = $state(0);
  let canStart = $state(false);
  let progressValue = $state(0);

  let interval: ReturnType<typeof setInterval>;

  function startTimer() {
    isRunning = true;
    startTime = Date.now();

    interval = setInterval(() => {
      time = Date.now() - startTime;
    }, 10);
  }

  function stopTimer() {
    isRunning = false;
    clearInterval(interval);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      if (keyDownStartTime === 0) {
        keyDownStartTime = Date.now();
      }
      if (isRunning) {
        stopTimer();
        keyDownStartTime = 0;
      }
    }
  }

  function onKeyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      if (!isRunning && canStart) {
        startTimer();
      }
      keyDownStartTime = 0;
    }
  }

  onMount(() => {
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyDown);

    const progressInterval = setInterval(() => {
      progressValue = keyDownStartTime === 0 ? 0 : Date.now() - keyDownStartTime;
      canStart = progressValue > waitTime;
    }, 10);

    onDestroy(() => {
      clearInterval(progressInterval);
    });
  });
</script>

<main>
  <div class="timer-wrapper">
    <div class:can-start={canStart} class="timer-text">
      <span class="time">{minutes + minutes > 0 ? ':' : '' + seconds}</span><span class="decimals">
        .{isRunning ? decimals[0] : decimals}</span
      >
    </div>
    <progress class:hidden={isRunning} max={waitTime} value={isRunning ? waitTime : progressValue}
    ></progress>
  </div>
</main>

<style>
  .can-start {
    color: var(--text-color);
  }

  .hidden {
    opacity: 0;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    user-select: none;
    font-stretch: semi-condensed;
  }

  .timer-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20vh;
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

  /* Progress bar color */
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
</style>
