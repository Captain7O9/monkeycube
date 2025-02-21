import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';
import { sequence } from '@sveltejs/kit/hooks';
import themes from '$lib/stores/themes.json';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	if (user) user.customTheme = JSON.parse(user.customTheme as string);

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

const handleTheme: Handle = async ({ event, resolve }) => {
	let userTheme;
	if (event.locals.user?.theme === 'custom') {
		userTheme = event.locals.user?.customTheme;
	} else {
		// @ts-expect-error trust me
		userTheme = themes[event.locals.user?.theme ?? 'serika dark'];
	}

	let replaceTo = '';
	for (const [key, value] of Object.entries(userTheme)) {
		replaceTo += `${key}: ${value}; `;
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('style=""', `style="${replaceTo}"`);
		}
	});
};

export const handle: Handle = sequence(handleAuth, handleTheme);
