<script lang="ts">
  import { fly } from 'svelte/transition';

  import { MUTATIONS } from '$lib/queries';

  let {
    currentTime,
    setScramble,
    after
  }: {
    currentTime: {
      id: number;
      time: number;
      isPlusTwo: boolean;
      isDNF: boolean;
    };
    setScramble?: (event: string) => Promise<void>;
    after?: (() => void) | (() => Promise<void>);
  } = $props();
</script>

<div class="timer-settings" transition:fly={{ y: '-500%' }}>
  <button
    class="plus-two"
    onclick={() => {
      MUTATIONS.handleToggle(currentTime.id, 'isPlusTwo', currentTime.isPlusTwo, after);
    }}
    class:toggled={currentTime.isPlusTwo}
    ><i class="fa-solid fa-clock"></i>+2
  </button>
  <button
    class="dnf"
    onclick={() => {
      MUTATIONS.handleToggle(currentTime.id, 'isDNF', currentTime.isDNF, after);
    }}
    class:toggled={currentTime.isDNF}
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
  <div class="separator"></div>
  <button
    class="delete"
    onclick={() => {
      MUTATIONS.handleDelete(currentTime.id, after);
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
