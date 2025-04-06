<script lang="ts">
	import AlgCard from '$lib/components/routes/algs/AlgCard.svelte';
	import type { TopFace } from '$lib/types';

	const alg = {
		attributes: {
			name: 'O1 - 1',
			group: 'dot',
			prob: '1/108',
			alg: "(R U2') (R2' F R F') U2' (R' F R F')"
		},

		icon: [
			[null, 'yellow', 'empty', 'yellow', null],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['yellow', 'empty', 'yellow', 'yellow', 'yellow'],
			[null, 'yellow', 'yellow', 'empty', null]
		] as TopFace
	};
</script>

<main class="constrain-width">
	<AlgCard {alg} />
</main>
