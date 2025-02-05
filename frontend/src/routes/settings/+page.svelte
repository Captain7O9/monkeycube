<script lang="ts">
  import { styles } from '$lib/style.svelte';
  import { onDestroy } from 'svelte';

  let customStyles = $state<{ [key: string]: string }>(styles.current);

  function applyStyles() {
    for (const [key] of Object.entries(styles.default)) {
      if (key.includes('color')) {
        document.documentElement.style.setProperty(key, customStyles[key]);
      }
    }
  }

  function saveStyles() {
    styles.set(customStyles);
    styles.save();
  }

  function resetStyles() {
    console.log('styles reset');
    customStyles = styles.default;
    applyStyles();
  }

  $effect(() => {
    applyStyles();
  });

  onDestroy(() => {
    saveStyles();
  });
</script>

<main class="constrain-width">
  <h1>Colors</h1>
  <!--  TODO: Handle colors and px styles-->
  <div class="color-controls">
    {#each Object.entries(styles.default) as [key]}
      {#if key.includes('color')}
        <div class="color-control">
          <label for={key}>{key}:</label>
          <input type="color" bind:value={customStyles[key]} />
        </div>
      {/if}
    {/each}
  </div>
  <button onclick={resetStyles}>Reset</button>
  <button onclick={saveStyles}>Apply</button>
</main>

<style lang="scss">
  h1 {
    background-color: var(--sub-alt-color);
    border-radius: var(--border-radius);
  }

  .color-controls {
    width: 30%;
  }

  .color-control {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
</style>
