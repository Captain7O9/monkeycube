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
    <div class="times-table" bind:clientHeight={tablePanelHeight} transition:fly={{ x: '-100%' }}>
      <TimesTable
        bind:this={table}
        onLoadFunction={loadTime}
        since={user.sessionStart}
        maxHeight={tablePanelHeight}
      />
      <a href="/times">show all</a>
    </div>

    <div class="timer-settings" transition:fly={{ y: '-500%' }}>
      <button
        class="plus-two"
        onclick={() => {
          handleToggle('plus_two', plusTwoToggle);
        }}
        class:toggled={plusTwoToggle}
        ><i class="fa-solid fa-clock"></i>+2
      </button>
      <div class="separator"></div>
      <button
        class="dnf"
        onclick={() => {
          handleToggle('dnf', dnfToggle);
        }}
        class:toggled={dnfToggle}
        ><i class="fa-solid fa-flag"></i>dnf
      </button>
      <div class="separator"></div>
      <button class="delete" onclick={deleteTime}
        ><i class="fa-solid fa-trash-can"></i>delete
      </button>
    </div>

    <div class="a" transition:fly={{ x: '100%' }}></div>
    <div class="b" transition:fly={{ x: '100%' }}></div>
  {:else}
    <!--Workaround to transition:fly making the element disappear from the DOM-->
    <div class="timer-settings hidden">
      <button class="setting"><i class="fa-solid fa-clock"></i>+2</button>
      <div class="separator"></div>
      <button class="setting"><i class="fa-solid fa-flag"></i>dnf</button>
      <div class="separator"></div>
      <button class="delete-button"><i class="fa-solid fa-trash-can"></i>delete</button>
    </div>
  {/if}

  <div class="timer">
    <div class:can-start={canStart} class="timer-text">
      <span class="time">{minutes}{seconds}</span><span class="decimals">
        .{isRunning ? decimals[0] : decimals}</span
      >
    </div>
    <progress class:hidden={isRunning} max={waitTime} value={isRunning ? waitTime : progressValue}
    ></progress>
  </div>
  <div class="scramble" class:hidden={canStart || isRunning}>
    D' U R F L2 R F U' F' U' B2 R' F R B' L F2 U' L2 R
  </div>
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
        background-color: var(--bg-color);
        border-radius: var(--border-radius);
        text-align: center;
      }

      a:hover {
        background-color: var(--sub-color);
        color: var(--bg-color);
        text-align: center;
      }
    }
    .timer-settings {
      @include panel;

      display: flex;
      justify-content: space-between;
      grid-area: 1 / 3 / 2 / 4;
      margin-bottom: auto;
      font-size: 0.75em;

      .plus-two,
      .dnf {
        &:hover {
          color: var(--text-color);
        }
      }

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
      }

      .separator {
        align-self: center;
        width: 0.5em;
        height: 2em;
        border-radius: 3px;
        background-color: var(--bg-color);
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
        transition: color 100ms;
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
      font-size: 2rem;
      transition: opacity 100ms;
      text-align: center;
    }

    .a {
      @include panel;
      grid-area: 1 / 5 / 3 / 6;
      margin-bottom: 2px;
    }

    .b {
      @include panel;
      margin-top: 2px;
      grid-area: 3 / 5 / 6 / 6;
    }
  }
</style>
