<script lang="ts">
	import { type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="modal-background">
	<div class="modal">
		{@render children?.()}
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.25);
		z-index: 1000;
	}

	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--background-color);
		padding: 1rem;
		border-radius: var(--border-radius);
		border: solid var(--sub-alt-color) 0.2em;
	}
</style>
