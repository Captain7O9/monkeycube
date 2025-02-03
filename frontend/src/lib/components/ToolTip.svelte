<script lang="ts">
  let { children, content } = $props();
</script>

<div data-content={content}>{@render children()}</div>

<style lang="scss">
  div {
    position: relative;
    &::before {
      position: absolute;
      content: attr(data-content);
      left: 50%;
      transform: translateX(-50%);
      bottom: 2em;
      color: var(--text-color);
      background-color: rgba(0, 0, 0, 0.5);
      padding: 2px 4px;
      border-radius: 3px;
      display: none;
      z-index: 1000;
    }

    &:hover::before {
      display: block;
    }
  }
</style>
