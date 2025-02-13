<script lang="ts">
  import type { Face } from '$lib/types';

  let { face }: { face: Face } = $props();
</script>

<div class="face-container">
  {#each face as row}
    {#each row as column}
      <div style="background-color: var(--{column})"></div>
    {/each}
  {/each}
</div>

<style lang="scss">
  .face-container {
    width: min-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 4px;

    div {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: calc(var(--border-radius) / 5);
    }
  }
</style>
