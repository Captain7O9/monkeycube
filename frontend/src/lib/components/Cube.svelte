<script lang="ts">
  import type { Move } from '$lib/types';
  import CubeFace from '$lib/components/CubeFace.svelte';
  import { CubeInstance } from '$lib/cube';

  let { scramble }: { scramble: Move[] | string } = $props();
  let cube = new CubeInstance();
  cube.reset().doMoves(scramble);
</script>

<div class="cube-container">
  {#each cube.state as face, i}
    {#if i === 0 || i === 5}
      <div></div>
    {:else if i === 1}
      <div></div>
      <div></div>
    {/if}

    <CubeFace {face} />
  {/each}
</div>

<style lang="scss">
  .cube-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 5px;
    width: min-content;
  }
</style>
