<script lang="ts">
	import AlgCard from './AlgCard.svelte';
	import { olls } from './algs';
</script>

<main class="constrain-width">
	<div class="algs">
		{#each olls as alg}
			<AlgCard {alg} />
		{/each}
	</div>
</main>

<style lang="scss">
	.algs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
		gap: 10px;
	}
</style>
