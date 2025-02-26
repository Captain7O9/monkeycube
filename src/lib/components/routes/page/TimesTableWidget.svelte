<script lang="ts">
	import type { Time } from '$lib/server/db/schema';
	import { formatTimeToString } from '$lib/utils';
	import { ToolTip, TimesOptionsModal } from '$lib/components/shared';
	import { MUTATIONS } from '$lib/queries';
	import { localTimes } from '$lib/stores';

	let {
		onLoadFunction = () => {},
		maxHeight = 0
	}: {
		onLoadFunction?: () => void;
		maxHeight: number;
	} = $props();

	let height = $state(53);
	let limit = $derived(Math.floor(maxHeight / height));
	let times: Time[] = $derived(localTimes.sinceSessionStart.splice(0, limit - 1));
	let modalId = $state(0);

	export async function loadTimes() {
		await localTimes.sync();
		onLoadFunction();
	}

	function handleClose() {
		modalId = 0;
	}
</script>

<table>
	<thead>
		<tr>
			<th>time</th>
			<th>ao5</th>
			<th>ao12</th>
			<th class="options">options</th>
		</tr>
	</thead>
	<tbody>
		{#each times as time}
			<tr bind:clientHeight={height}>
				<td class="time">{formatTimeToString(time.time)}</td>
				<td class="time">{formatTimeToString(time.time)}</td>
				<td class="time">{formatTimeToString(time.time)}</td>
				<!--        <td class="date">{new Date(time.date ?? 0).toLocaleDateString()}</td>-->
				<td class="options">
					<button
						onclick={() => {
							MUTATIONS.time.handleToggle(time.id, 'isPlusTwo', time.isPlusTwo, loadTimes);
							localTimes.sync();
						}}
						class:toggled={time.isPlusTwo}
						aria-label="+2"
					>
						<ToolTip content="+2">
							<i class="fa-solid fa-clock"></i></ToolTip
						></button
					>
					<button
						onclick={() => {
							MUTATIONS.time.handleToggle(time.id, 'isDNF', time.isDNF, loadTimes);
							localTimes.sync();
						}}
						class:toggled={time.isDNF}
						aria-label="dnf"
					>
						<ToolTip content="dnf">
							<i class="fa-solid fa-flag"></i>
						</ToolTip>
					</button>
					<button
						aria-label="Info"
						onclick={() => {
							modalId = time.id;
						}}
					>
						<ToolTip content="info">
							<i class="fa-solid fa-info-circle"></i></ToolTip
						></button
					>
				</td>
			</tr>
		{:else}
			<tr bind:clientHeight={height}>
				<td class="placeholder">-</td>
				<td class="placeholder">-</td>
				<td class="placeholder">-</td>
				<td class="placeholder">-</td>
			</tr>
		{/each}
	</tbody>
</table>

{#if modalId > 0}
	<TimesOptionsModal timeId={modalId} {handleClose} />
{/if}

<style lang="scss">
	table {
		text-align: left;
		border-collapse: collapse;

		th {
			font-weight: normal;
		}

		td {
			padding: 1rem 0.4rem;
		}

		thead th {
			font-size: 0.75rem;
			padding: 0.3rem 0.4rem;
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
			width: 0.1%;
			padding-right: 1rem;
			justify-content: space-evenly;
			white-space: nowrap;
			color: var(--sub-color);

			.toggled {
				color: var(--main-color);

				&:hover {
					color: var(--main-color);
				}
			}

			button:hover {
				color: var(--text-color);
			}
		}

		.placeholder {
			color: var(--sub-color);
		}
	}
</style>
