<script lang="ts">
  import CubeFace from '$lib/components/CubeFace.svelte';
  import { CubeInstance } from '$lib/cube';
  import type { Alg } from 'cubing/alg';

  let { scramble }: { scramble: Alg } = $props();
  let cube = $state(new CubeInstance());
  let cubeState = $state(cube.state);

  $effect(() => {
    cube.reset();
    cubeState = cube.doMoves(scramble).state;
  });
</script>

<div class="cube">
  <div class="cube-container">
    {#each cubeState as face, i}
      {#if i === 0 || i === 5}
        <div></div>
      {:else if i === 1}
        <div></div>
        <div></div>
      {/if}

      <CubeFace {face} />
    {/each}
  </div>
</div>

<style lang="scss">
  .cube {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .cube-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 5px;
    width: min-content;
  }
</style>
