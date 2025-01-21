<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { formatTime } from '$lib/utils';
  import { user } from '$lib/user.svelte';

  const waitTime = 500;

  let time = $state(0); // Time in milliseconds
  let minutes = $derived(formatTime(time).minutes);
  let seconds = $derived(formatTime(time).seconds);
  let decimals = $derived(formatTime(time).decimals);

  let isRunning = $state(false);

  let startTime = 0;
  let keyDownStartTime = 0;
  let canStart = $state(false);
  let progressValue = $state(0);

  let interval: ReturnType<typeof setInterval>;

  let plusTwoToggle = $state(false);
  let dnfToggle = $state(false);

  let currentTimeId = '';

  function startTimer() {
    isRunning = true;
    startTime = Date.now();

    interval = setInterval(() => {
      time = Date.now() - startTime;
    }, 10);
  }

  async function stopTimer() {
    isRunning = false;
    clearInterval(interval);
    user
      .createTime({
        time: time,
        event: '3x3'
      })
      .then((response) => {
        currentTimeId = response.content._id;
      });
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

  async function loadTime() {
    const response = await user.fetchTime(currentTimeId);
    plusTwoToggle = response.plus_two;
    dnfToggle = response.dnf;
  }

  async function handleToggle(option: 'dnf' | 'plus_two', currentStatus: boolean = false) {
    await user.updateTime({ _id: currentTimeId, [option]: !currentStatus });
    await loadTime();
  }

  async function deleteTime() {
    await user.deleteTime(currentTimeId);
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
  <div class:hidden={canStart || isRunning} class="timer-settings">
    <button
      onclick={() => {
        handleToggle('dnf', dnfToggle);
      }}
      class:toggled={dnfToggle}
      class="setting"
      ><i class="fa-solid fa-clock"></i>+2
    </button>
    <button
      onclick={() => {
        handleToggle('plus_two', plusTwoToggle);
      }}
      class:toggled={plusTwoToggle}
      class="setting"
      ><i class="fa-solid fa-flag"></i>dnf
    </button>
    <button onclick={deleteTime} class="delete-button"
      ><i class="fa-solid fa-trash-can"></i>delete</button
    >
  </div>
  <div class="timer-wrapper">
    <div class:can-start={canStart} class="timer-text">
      <span class="time">{minutes}{seconds}</span><span class="decimals">
        .{isRunning ? decimals[0] : decimals}</span
      >
    </div>
    <progress class:hidden={isRunning} max={waitTime} value={isRunning ? waitTime : progressValue}
    ></progress>
    <div class:hidden={canStart || isRunning} class="scramble-text">
      D' U R F L2 R F U' F' U' B2 R' F R B' L F2 U' L2 R
    </div>
  </div>
</main>

<style>
  .can-start {
    color: var(--text-color);
  }

  .toggled {
    color: var(--main-color);
  }

  main {
    display: flex;
    flex-direction: column;
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
    margin-bottom: 40vh;
  }

  .timer-text {
    transition: color 100ms;
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

  .scramble-text {
    padding-top: 2vh;
    font-size: 2rem;
    transition: opacity 100ms;
  }

  .timer-settings {
    border-radius: 8px;
    margin-bottom: auto;
    background: var(--sub-alt-color);
    transition: opacity 100ms;
    font-size: 0.75em;
  }

  .timer-settings > button {
    padding: 1em;
    display: inline-flex;
    align-items: baseline;
  }

  .delete-button:hover {
    color: var(--error-color);
  }

  .setting:hover {
    color: var(--text-color);
  }

  .timer-settings > button > i {
    padding-right: 0.5em;
  }
</style>
