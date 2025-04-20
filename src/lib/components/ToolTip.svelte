<script lang="ts">
	let { children, content } = $props();
</script>

<div data-content={content}>{@render children()}</div>

<style>
	div {
		position: relative;

		&::before {
			position: absolute;
			content: attr(data-content);
			left: 50%;
			transform: translateX(-50%);
			bottom: 2em;
			color: white;
			background-color: rgba(0, 0, 0, 0.7);
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
