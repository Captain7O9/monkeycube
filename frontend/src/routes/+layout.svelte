<script>
  import '../app.css';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    document.documentElement.setAttribute('data-theme', 'default');
  });
</script>

<div id="wrapper">
  <div id="layout">
    <div id="header">
      {@render children()}
    </div>
    <div id="content">content</div>
    <div id="footer">footer</div>
  </div>
</div>

<style>
  #layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: clamp(500px, 80vw, 1200px);

    padding: 20px 0;
  }

  #content {
    flex-grow: 1;
  }

  #wrapper {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    min-height: 100vh;
  }
</style>
