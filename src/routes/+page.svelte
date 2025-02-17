<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { formatTime } from '$lib/utils';
  import { TimesTableWidget, RightPanel } from '$lib/components';
  import { Alg } from 'cubing/alg';
  import { randomScrambleForEvent } from 'cubing/scramble';
  import type { PageProps } from './$types';
  import session from '$lib/stores/session.svelte.js';
  import { QUERIES } from '$lib/queries';

  let { data }: PageProps = $props();

  const user = data.user;
  console.log('Logging user from +page.svelte', user);

  const waitTime = 200;

  let time = $state(0); // Time in milliseconds
  let minutes = $derived(formatTime(time).minutes);
  let seconds = $derived(formatTime(time).seconds);
  let decimals = $derived(formatTime(time).decimals);

  let currentTime = $state({
    id: 0,
    time: 0,
    isPlusTwo: false,
    isDNF: false
  });

  let isRunning = $state(false);

  let startTime = 0;
  let keyDownStartTime = 0;
  let canStart = $state(false);
  let progressValue = $state(0);

  let interval: ReturnType<typeof setInterval>;
  let progressInterval: ReturnType<typeof setInterval>;

  let table = $state<TimesTableWidget>();
  let tablePanelHeight = $state(0);

  let scramble: string = $state('');
  const SCRAMBLE_REGEX = new RegExp(/(U'|U2|U)|(R'|R2|R)|(F'|F2|F)|(D'|D2|D)|(L'|L2|L)|(B'|B2|B)/g);

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
    await getNewScramble('333');

    if (!user) return;

    await QUERIES.postTime(time, scramble, '333');
    await table?.loadTimes();
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

  function onScrambleKeyDown(event: KeyboardEvent) {
    if (['Enter', 'Escape'].includes(event.code)) {
      (event.target as HTMLElement).blur();
    }
  }

  function setCurrent() {
    const times = session.times.get();
    const { id = 0, time = 0, isPlusTwo = false, isDNF = false } = times[0] || {};
    Object.assign(currentTime, { id, time, isPlusTwo, isDNF });
  }

  async function handleToggle(option: 'isDNF' | 'isPlusTwo', currentStatus: boolean = false) {
    await QUERIES.patchTime(currentTime.id, { [option]: !currentStatus });
    await table?.loadTimes();
  }

  async function onTimeDelete() {
    if (!currentTime.id) {
      return;
    }

    await QUERIES.deleteTime(currentTime.id);
    await table?.loadTimes();
  }

  async function getNewScramble(eventID: string) {
    console.log('Fetch new scramble');
    scramble = (await randomScrambleForEvent(eventID)).toString();
  }

  function uppercase(node: HTMLDivElement) {
    const transform = () => {
      const matched = node.innerText.toUpperCase().match(SCRAMBLE_REGEX);
      matched?.forEach((match) => {
        node.innerText = node.innerText.replace(match, match.toUpperCase());
      });
      node.innerText = matched ? matched.join(' ') : '';

      // Put cursor at the end of the text
      window.getSelection()?.selectAllChildren(node);
      window.getSelection()?.collapseToEnd();
    };

    node.addEventListener('input', transform, { capture: true });

    transform();
  }

  onMount(async () => {
    (document.activeElement as HTMLElement)?.blur();

    await table?.loadTimes();

    progressInterval = setInterval(() => {
      progressValue = keyDownStartTime === 0 ? 0 : Date.now() - keyDownStartTime;
      canStart = progressValue > waitTime;
    }, 10);

    await getNewScramble('333');
  });

  onDestroy(() => {
    clearInterval(progressInterval);
  });
</script>

<svelte:window onkeydown={onWindowKeyDown} onkeyup={onWindowKeyUp} />
<main>
  {#if !(canStart || isRunning)}
    <div class="times-table" bind:clientHeight={tablePanelHeight} transition:fly={{ x: '-100%' }}>
      <TimesTableWidget
        bind:this={table}
        onLoadFunction={setCurrent}
        maxHeight={tablePanelHeight}
      />
      <a href="/profile">show all</a>
    </div>

    <div class="timer-settings" transition:fly={{ y: '-500%' }}>
      <button
        class="plus-two"
        onclick={() => {
          handleToggle('isPlusTwo', currentTime.isPlusTwo);
        }}
        class:toggled={currentTime.isPlusTwo}
        ><i class="fa-solid fa-clock"></i>+2
      </button>
      <button
        class="dnf"
        onclick={() => {
          handleToggle('isDNF', currentTime.isDNF);
        }}
        class:toggled={currentTime.isDNF}
        ><i class="fa-solid fa-flag"></i>dnf
      </button>
      <div class="separator"></div>
      <button
        class="scramble-reset"
        onclick={async () => {
          await getNewScramble('333');
        }}
      >
        <i class="fa-solid fa-arrow-rotate-back"></i>scramble
      </button>
      <div class="separator"></div>
      <button class="delete" onclick={onTimeDelete}
        ><i class="fa-solid fa-trash-can"></i>delete
      </button>
    </div>

    <div class="right-panel-container" transition:fly={{ x: '100%' }}>
      <RightPanel scramble={new Alg(scramble)} />
    </div>
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
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      contenteditable="true"
      bind:innerText={scramble}
      use:uppercase
      onblur={async () => {
        window.getSelection()?.removeAllRanges();
        if (!scramble) {
          await getNewScramble('333');
        }
      }}
      onkeydown={onScrambleKeyDown}
    ></div>
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

    .toggled {
      color: var(--main-color);
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

    .timer-settings {
      @include panel;

      display: flex;
      justify-content: space-between;
      grid-area: 1 / 3 / 2 / 4;
      margin-bottom: auto;
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
      overflow: auto;

      div {
        margin: 1vh auto;
        width: 85%;
        background-color: transparent;
        border: transparent;
        border-radius: var(--border-radius);
        font-size: 1.5rem;
        color: var(--sub-color);
        word-spacing: 0.5rem;
        resize: none;
        overflow: hidden;

        &:focus {
          outline: solid var(--sub-color) 2px;
          outline-offset: -1px;
        }
        &::selection {
          background-color: var(--sub-color);
          color: var(--background-color);
        }
      }
    }
  }

  .right-panel-container {
    grid-area: 1 / 5 / 5 / 6;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
