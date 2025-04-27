import type { Time } from '$lib/server/db/schema';
import { QUERIES } from '$lib/queries';
import session from './session.svelte';

class LocalTimes {
	#times: Time[] = $state([]);

	get times() {
		return this.#times.toSorted((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	}
	set times(value) {
		this.#times = value;
	}

	get last() {
		return this.#times.toSorted((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})[0];
	}

	get sinceSessionStart() {
		return this.#times
			.toSorted((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			})
			.filter((time) => {
				return new Date(time.date).getTime() > session.start;
			});
	}

	time = (timeId: number) => {
		return this.#times.filter((time) => time.id === timeId)[0];
	};

	sync = async ({
		limit = 2 ** 10,
		since = session.start
	}: { limit?: number; since?: number } = {}) => {
		console.log('Syncing times');
		this.times = await QUERIES.times.getTimes({ limit, since });
	};
}

export default new LocalTimes();
