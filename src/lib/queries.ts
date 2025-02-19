import type { Time } from '$lib/server/db/schema';
import { localTimes } from '$lib/stores';

export const QUERIES = {
	getTimes: async function ({
		limit,
		since,
		save = true
	}: {
		limit: number;
		since: number;
		save?: boolean;
	}): Promise<Time[]> {
		try {
			const response = await fetch(`/api/times?limit=${limit}&since=${since}`, {
				method: 'GET'
			});

			if (!response.ok) {
				throw new Error('Failed to fetch times');
			}

			const newTimes = await response.json();
			if (save) localTimes.times = newTimes;
			return newTimes;
		} catch (error) {
			console.error('Error fetching times:', error);
			return [];
		}
	},
	getTime: async function (timeId: number, save: boolean = true) {
		try {
			const response = await fetch(`/api/times/${timeId}`, {
				method: 'GET'
			});

			if (!response.ok) {
				throw new Error('Failed to fetch time');
			}

			const newTime = await response.json();

			if (save) {
				console.log('Saving time');

				const targetTimeIndex = localTimes.times.findIndex((time) => time.id);

				if (targetTimeIndex === -1) {
					localTimes.times.push(newTime);
				} else {
					localTimes.times[targetTimeIndex] = newTime;
				}
			}

			return newTime;
		} catch (error) {
			console.error(`Error fetching time ${timeId}:`, error);
		}
	}
};

export const MUTATIONS = {
	postTime: async function (time: number, scramble: string, event: string): Promise<Time | null> {
		try {
			const response = await fetch(`/api/times`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					time: time,
					scramble: scramble,
					event: event
				})
			});

			return await response.json();
		} catch (error) {
			console.error(error);
			return null;
		}
	},
	patchTime: async function (timeId: number, body: object): Promise<Time | null> {
		try {
			const response = await fetch(`/api/times/${timeId}`, {
				method: 'PATCH',
				headers: {
					'Application-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			if (!response.ok) {
				throw new Error('Failed to fetch times');
			}

			return await response.json();
		} catch (error) {
			console.error('Error fetching times:', error);
			return null;
		}
	},
	deleteTime: async function (timeId: number): Promise<Time | null> {
		try {
			const response = await fetch(`/api/times/${timeId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to fetch times');
			}

			return await response.json();
		} catch (error) {
			console.error('Error fetching times:', error);
			return null;
		}
	},
	handleToggle: async function (
		timeId: number,
		option: 'isDNF' | 'isPlusTwo',
		currentStatus: boolean = false,
		after?: (() => void) | (() => Promise<void>)
	) {
		await MUTATIONS.patchTime(timeId, { [option]: !currentStatus });
		if (after) await after();
	},
	handleDelete: async function (timeId: number, after?: (() => void) | (() => Promise<void>)) {
		await MUTATIONS.deleteTime(timeId);
		if (after) await after();
	}
};
