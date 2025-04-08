import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

console.log(`GITHUB_CLIENT_ID: ${GITHUB_CLIENT_ID}`);
console.log(`GITHUB_CLIENT_SECRET: ${GITHUB_CLIENT_SECRET}`);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, null);
