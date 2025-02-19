import type { Time } from '$lib/server/db/schema';

let sessionStart = Date.now();

let sessionTimes: Time[] = $state([]);
const sortedSessionTimes = $derived(
	sessionTimes.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	})
);

function createSessionStore() {
	return {
		get start() {
			return sessionStart;
		},
		set() {
			sessionStart = Date.now();
		},
		times: {
			get() {
				return sortedSessionTimes;
			},
			set(times: Time[]) {
				sessionTimes = times;
			}
		}
	};
}

const session = createSessionStore();

export default session;
