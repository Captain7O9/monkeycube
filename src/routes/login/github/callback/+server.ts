import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';
import { github } from '$lib/server/oauth';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { encodeBase32LowerCase } from '@oslojs/encoding';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (code === null || state === null || storedState === null) {
		return new Response('Something went wrong...', {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response('Something went wrong...', {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (e: unknown) {
		// Invalid code or client credentials
		return new Response(`Something went wrong... (${e})`, {
			status: 400
		});
	}

	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;
	const githubUsername = githubUser.login;

	const [existingUser] = await db
		.select()
		.from(table.user)
		.where(eq(table.user.githubId, githubUserId));

	if (existingUser) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response('error 2', {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	const userId = generateUserId();
	await db.insert(table.user).values({
		id: userId,
		githubId: githubUserId,
		username: githubUsername
	});
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}
