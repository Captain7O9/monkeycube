<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  const waitTime = 500;

  let time = $state(0); // Time in milliseconds
  let seconds = $derived((time / 1000).toFixed(0));
  let decimals = $derived(time.toString().slice(-3).padStart(3, '0'));

  let isRunning = $state(false);

  let startTime = 0;
  let keyDownStartTime = $state(0);
  let canStart = $state(false);
  let progressValue = $state(0);

  let interval: number;

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

<div class="content">
  <div class="timer-wrapper">
    <div class="timer-text">
      <span class="seconds">{seconds}</span><span class="decimals">
        .{isRunning ? decimals[0] : decimals}</span
      >
    </div>
    <progress max={waitTime} value={isRunning ? waitTime : progressValue}></progress>
  </div>
</div>

<style>
  .content {
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
  }

  .seconds {
    font-size: 8rem;
  }

  .decimals {
    font-size: 2rem;
  }

  progress {
    width: 10vw;
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
