<script lang="ts">
	import type { Time } from '$lib/server/db/schema';
	import { formatTimeToString } from '$lib/utils';
	import { ToolTip } from '$lib/components';
	import { MUTATIONS, QUERIES } from '$lib/queries';

	let {
		times
	}: {
		times: Time[];
	} = $props();

	let limit = $state(10);
	let displayedTimes = $derived(times.slice(0, limit));
</script>

<div class="times-table">
	<table>
		<thead>
			<tr>
				<th class="time">time</th>
				<th class="date">date</th>
				<th class="options">options</th>
			</tr>
		</thead>
		<tbody>
			{#each displayedTimes as time}
				<tr>
					<td class="time">{formatTimeToString(time.time)}</td>
					<td class="date"
						>{`${new Date(time.date).toLocaleDateString()} ${new Date(time.date).toLocaleTimeString()}`}</td
					>
					<td class="options">
						<button
							onclick={() => {
								MUTATIONS.handleToggle(time.id, 'isPlusTwo', time.isPlusTwo);
								QUERIES.getTime(time.id);
							}}
							class:toggled={time.isPlusTwo}
							aria-label="+2"
							class="setting"
						>
							<ToolTip content="+2">
								<i class="fa-solid fa-clock"></i></ToolTip
							></button
						>
						<button
							onclick={() => {
								MUTATIONS.handleToggle(time.id, 'isDNF', time.isDNF);
								QUERIES.getTime(time.id);
							}}
							class:toggled={time.isDNF}
							aria-label="dnf"
							class="setting"
						>
							<ToolTip content="dnf">
								<i class="fa-solid fa-flag"></i>
							</ToolTip>
						</button>
						<button
							onclick={() => {
								MUTATIONS.handleDelete(time.id);
								QUERIES.getTime(time.id);
							}}
							aria-label="Delete"
							class="delete-button"
						>
							<ToolTip content="delete">
								<i class="fa-solid fa-trash-can"></i></ToolTip
							></button
						>
					</td>
				</tr>
			{:else}
				<tr>
					<td>-</td>
					<td>-</td>
					<td>-</td>
				</tr>
			{/each}
		</tbody>
	</table>
	{#if limit < times.length}
		<button
			class="show"
			onclick={() => {
				limit += 10;
			}}>show more</button
		>
	{:else}
		<button
			class="show"
			onclick={() => {
				limit = 10;
			}}>show less</button
		>
	{/if}
</div>

<style lang="scss">
	.toggled {
		color: var(--main-color);
	}

	.times-table {
		display: flex;
		flex-direction: column;

		table {
			width: 100%;
			text-align: left;
			border-collapse: collapse;
			table-layout: fixed;

			th {
				font-weight: normal;
			}

			td {
				padding: 1rem;
			}

			thead th {
				font-size: 0.75rem;
				padding: 0.3rem 1rem;
				position: sticky;
				top: 0;
				background-color: var(--background-color);
			}

			tbody {
				color: var(--text-color);
				tr:nth-child(odd) td {
					background-color: var(--sub-alt-color);
				}
				tr:nth-child(even) td {
					background-color: var(--background-color);
				}
			}

			th,
			td {
				&:first-child {
					border-radius: var(--border-radius) 0 0 var(--border-radius);
				}
				&:last-child {
					border-radius: 0 var(--border-radius) var(--border-radius) 0;
				}
			}

			.options {
				color: var(--sub-color);
				width: 65px;
			}

			.delete-button:hover {
				color: var(--error-color);
			}

			.setting:hover {
				color: var(--text-color);
			}
		}
		.show {
			color: var(--text-color);
			background-color: var(--sub-alt-color);
			padding: 5px;
			width: 100%;
			margin-top: 5px;
			border-radius: var(--border-radius);

			&:hover {
				background-color: var(--text-color);
				color: var(--sub-alt-color);
			}
		}
	}
</style>
