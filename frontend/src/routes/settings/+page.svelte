<script lang="ts">
  import { styles } from '$lib/stores/style.svelte.js';
  import { onDestroy } from 'svelte';

  let customStyles = $state<{ [key: string]: string }>(styles.current);

  function applyStyles() {
    for (const [key] of Object.entries(styles.default)) {
      if (!key.includes('border')) {
        document.documentElement.style.setProperty(key, customStyles[key]);
      }
    }
  }

  function saveStyles() {
    styles.set(customStyles);
    styles.save();
  }

  function resetStyles() {
    customStyles = styles.default;
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
  <div class="settings">
    <div class="color-controls">
      {#each Object.entries(styles.default) as [key]}
        {#if !key.includes('border')}
          <section>
            <label for={key}>{key}:</label>
            <input type="color" bind:value={customStyles[key]} />
          </section>
        {/if}
      {/each}
      <button onclick={resetStyles}>Reset</button>
      <button onclick={saveStyles}>Apply</button>
    </div>
    <div class="presets">
      {#each Object.entries(styles.presets) as [preset]}
        <button
          onclick={() => {
            customStyles = styles.presets[preset];
            applyStyles();
          }}>{preset}</button
        >
      {/each}
    </div>
  </div>
  <!--  Note: Styles will auto apply onDestroy, but not on page refresh/leave-->
</main>

<style lang="scss">
  h1 {
    background-color: var(--sub-alt-color);
    border-radius: var(--border-radius);
  }

  .settings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    .color-controls {
      section {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
    }

    .presets {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
  }
</style>
