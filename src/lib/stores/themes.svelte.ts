import themes from './themes.json';
import { MUTATIONS } from '$lib/queries';
import type { Theme } from '$lib/types';
import { browser } from '$app/environment';

/**
 * @file themes.svelte.ts
 * @module Themes
 * @description
 * A store to manage the themes of the application.
 * Stores:
 * - `availableThemes`: a list of available themes.
 * - `current`: an object containing the current theme name and the current custom theme.
 */
class Themes {
	availableThemes: {
		[key: string]: Theme;
	} = themes;

	#currentTheme: { name: string; custom: Theme } = $state({
		name: 'serika dark',
		custom: themes['serika dark']
	});

	/**
	 * Get the current theme
	 */
	get current(): Theme {
		return this.#currentTheme.name === 'custom'
			? this.#currentTheme.custom
			: this.availableThemes[this.#currentTheme.name];
	}

	/**
	 * Get the current theme name
	 */
	get name(): string {
		return this.#currentTheme.name;
	}

	/**
	 * Get the custom theme
	 */
	get custom(): Theme {
		return this.#currentTheme.custom;
	}

	set = async ({
		name,
		custom,
		update = true
	}: {
		name: string;
		custom?: Theme;
		update?: boolean;
	}) => {
		this.#currentTheme.name = name;
		if (custom) this.#currentTheme.custom = custom;
		if (update) await this.apply();
	};

	apply = async () => {
		let replaceTo = '';

		for (const [key, value] of Object.entries(this.current)) {
			replaceTo += `${key}: ${value}; `;
		}

		if (browser) document.querySelector('body')?.setAttribute('style', replaceTo);

		await MUTATIONS.user.patch({
			theme: this.#currentTheme.name,
			customTheme: this.#currentTheme.custom
		});
	};
}

export default new Themes();
