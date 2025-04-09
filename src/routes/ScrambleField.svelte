<script lang="ts">
  import { randomScrambleForEvent } from 'cubing/scramble';
  import { Alg } from 'cubing/alg';

  let {
    autoGenerate,
    onNewScramble
  }: { autoGenerate: boolean; onNewScramble: (newScramble: Alg) => void } = $props();

  const SCRAMBLE_REGEX = new RegExp(/(U'|U2|U)|(R'|R2|R)|(F'|F2|F)|(D'|D2|D)|(L'|L2|L)|(B'|B2|B)/g);

  let scramble = $state('');

  $effect(() => {
    onNewScramble(new Alg(scramble));
  });

  export async function setNewScramble(event: string) {
    scramble = (await randomScrambleForEvent(event)).toString();
  }

  function onScrambleKeyDown(event: KeyboardEvent) {
    if (['Enter', 'Escape'].includes(event.code)) {
      (event.target as HTMLElement).blur();
    }
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
</script>

<div class="scramble">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    contenteditable="true"
    bind:innerText={scramble}
    use:uppercase
    onblur={async () => {
      window.getSelection()?.removeAllRanges();
      if (!scramble && autoGenerate) await setNewScramble('333');
    }}
    onkeydown={onScrambleKeyDown}
  ></div>
</div>

<style lang="scss">
  div {
    margin: 1vh auto;
    background-color: transparent;
    border: transparent;
    border-radius: var(--border-radius);
    color: var(--sub-color);
    word-spacing: 0.5rem;
    resize: none;
    overflow: hidden;
    width: 95%;

    &:focus {
      outline: solid var(--sub-color) 2px;
      outline-offset: -1px;
    }
    &::selection {
      background-color: var(--sub-color);
      color: var(--background-color);
    }
  }
</style>
