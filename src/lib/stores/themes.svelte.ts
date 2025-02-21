import themes from './themes.json';
import { MUTATIONS } from '$lib/queries';
import type { Theme } from '$lib/types';
import { browser } from '$app/environment';

class Themes {
	availableThemes: {
		[key: string]: Theme;
	} = themes;

	currentTheme: { name: string; values: Theme } = $state({
		name: 'serika dark',
		values: themes['serika dark']
	});

	constructor() {}

	save = () => {};
	set = async ({
		name,
		custom,
		update = true
	}: {
		name: string;
		custom?: Theme | undefined;
		update?: boolean;
	}) => {
		if (name === 'custom') {
			if (custom) {
				this.currentTheme = { name, values: custom };
			} else {
				this.currentTheme = { name, values: this.currentTheme.values };
			}
		} else {
			this.currentTheme = { name, values: this.availableThemes[name] };
		}

		if (update) await this.apply();
	};

	apply = async () => {
		let replaceTo = '';

		for (const [key, value] of Object.entries(this.currentTheme.values)) {
			replaceTo += `${key}: ${value}; `;
		}

		if (browser) document.querySelector('body')?.setAttribute('style', replaceTo);

		await MUTATIONS.user.patch({
			theme: this.currentTheme.name,
			customTheme: this.currentTheme.name === 'custom' ? this.currentTheme.values : null
		});
	};
}

export default new Themes();
