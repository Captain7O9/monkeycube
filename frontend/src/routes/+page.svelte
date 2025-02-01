<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { formatTime } from '$lib/utils';
  import { user } from '$lib/user.svelte.js';
  import TimesTable from '$lib/components/TimesTable.svelte';

  const waitTime = 200;

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

  let currentTimeId = $derived(
    (user.times[0]?.date ?? 0 > user.sessionStart) ? user.times[0]._id : ''
  );

  let table = $state<TimesTable>();
  let tablePanelHeight = $state(0);

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
    await user.time.createOne({
      time: time,
      event: '3x3'
    });
    await table?.loadTimes();
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
    if (!currentTimeId) {
      time = 0;
      return;
    }
    const response = await user.time.fetchOne(currentTimeId);
    plusTwoToggle = response.plus_two;
    dnfToggle = response.dnf;
    console.log(response.time);
    time = response.time;
  }

  async function handleToggle(option: 'dnf' | 'plus_two', currentStatus: boolean = false) {
    console.log({ _id: currentTimeId, [option]: !currentStatus });
    await user.time.updateOne({ _id: currentTimeId, [option]: !currentStatus });
    await table?.loadTimes();
  }

  async function deleteTime() {
    if (!currentTimeId) {
      return;
    }
    await user.time.deleteOne(currentTimeId);
    await table?.loadTimes();
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
  {#if !(canStart || isRunning)}
    <div
      id="times-table"
      bind:clientHeight={tablePanelHeight}
      transition:fly={{ x: '-100%' }}
      class="panel"
    >
      <TimesTable
        bind:this={table}
        onLoadFunction={loadTime}
        since={user.sessionStart}
        maxHeight={tablePanelHeight}
      />
      <a href="/times">show all</a>
    </div>

    <div id="timer-settings" transition:fly={{ y: '-500%' }} class="panel">
      <button
        onclick={() => {
          handleToggle('plus_two', plusTwoToggle);
        }}
        class:toggled={plusTwoToggle}
        class="setting"
        ><i class="fa-solid fa-clock"></i>+2
      </button>
      <div class="separator"></div>
      <button
        onclick={() => {
          handleToggle('dnf', dnfToggle);
        }}
        class:toggled={dnfToggle}
        class="setting"
        ><i class="fa-solid fa-flag"></i>dnf
      </button>
      <div class="separator"></div>
      <button onclick={deleteTime} class="delete-button"
        ><i class="fa-solid fa-trash-can"></i>delete
      </button>
    </div>

    <div id="a" transition:fly={{ x: '100%' }} class="panel"></div>
    <div id="b" transition:fly={{ x: '100%' }} class="panel"></div>
  {:else}
    <!--Workaround to transition:fly making the element disappear from the DOM-->
    <div id="timer-settings" class="hidden">
      <button class="setting"><i class="fa-solid fa-clock"></i>+2</button>
      <div class="separator"></div>
      <button class="setting"><i class="fa-solid fa-flag"></i>dnf</button>
      <div class="separator"></div>
      <button class="delete-button"><i class="fa-solid fa-trash-can"></i>delete</button>
    </div>
  {/if}

  <div id="timer-wrapper">
    <div class:can-start={canStart} class="timer-text">
      <span class="time">{minutes}{seconds}</span><span class="decimals">
        .{isRunning ? decimals[0] : decimals}</span
      >
    </div>
    <progress class:hidden={isRunning} max={waitTime} value={isRunning ? waitTime : progressValue}
    ></progress>
  </div>
  <div class:hidden={canStart || isRunning} class="scramble-text">
    D' U R F L2 R F U' F' U' B2 R' F R B' L F2 U' L2 R
  </div>
</main>

<style>
  .panel {
    background-color: var(--sub-alt-color);
    border-radius: var(--border-radius);
  }

  .separator {
    align-self: center;
    width: 0.5em;
    height: 2em;
    border-radius: 3px;
    background-color: var(--bg-color);
  }

  .can-start {
    color: var(--text-color);
  }

  .toggled {
    color: var(--main-color);
  }

  main {
    display: grid;
    grid-template-rows: min-content 1fr 1fr;
    grid-template-columns: 1fr 1fr minmax(min-content, 1fr) 1fr 1fr;
    flex-grow: 1;
    user-select: none;
    font-stretch: semi-condensed;
    margin: 0 20px;
    overflow: hidden;
    max-height: 100%;
  }

  #timer-wrapper {
    align-self: end;
    padding-bottom: 35px;
    grid-area: 2 / 2 / 3 / 5;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    grid-area: 3 / 2 / 4 / 5;
    font-size: 2rem;
    transition: opacity 100ms;
    text-align: center;
  }

  #timer-settings {
    display: flex;
    justify-content: space-between;
    grid-area: 1 / 3 / 2 / 4;
    margin-bottom: auto;
    font-size: 0.75em;
  }

  #timer-settings > button {
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

  #timer-settings > button > i {
    padding-right: 0.5em;
  }

  #times-table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-area: 1 / 1 / 4 / 2;
    padding: 5px;
  }

  #times-table > a {
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    text-align: center;
  }

  #times-table > a:hover {
    background-color: var(--sub-color);
    color: var(--bg-color);
    text-align: center;
  }

  #a {
    grid-area: 1 / 5 / 3 / 6;
    margin-bottom: 2px;
  }

  #b {
    margin-top: 2px;
    grid-area: 3 / 5 / 6 / 6;
  }
</style>
