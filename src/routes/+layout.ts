import { themes } from '$lib/stores';
import type { Theme } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	await themes.set({
		name: data.user?.theme ?? 'serika dark',
		custom: (data.user?.customTheme as Theme) ?? undefined,
		update: false
	});

	return { user: data.user };
};
