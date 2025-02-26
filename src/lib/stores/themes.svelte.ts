import themesList from './list.json';
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
	} = themesList;

	#currentTheme: { name: string; custom: Theme } = $state({
		name: 'serika dark',
		custom: themesList['serika dark']
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

	/**
	 * Set the current theme
	 * @param name The name of the theme or 'custom' for custom theme
	 * @param custom The custom theme
	 * @param apply Whether to update the theme or not
	 * @param push Whether to push the theme to the server or not
	 */
	set = async ({
		name,
		custom,
		apply = true,
		push = true
	}: {
		name: string;
		custom?: Theme;
		apply?: boolean;
		push?: boolean;
	}) => {
		this.#currentTheme.name = name;
		if (custom) this.#currentTheme.custom = custom;
		if (apply) await this.apply();
		if (push) await this.push();
	};

	apply = async () => {
		let replaceTo = '';

		for (const [key, value] of Object.entries(this.current)) {
			replaceTo += `${key}: ${value}; `;
		}

		if (browser) document.querySelector('body')?.setAttribute('style', replaceTo);
	};

	async push() {
		await MUTATIONS.user.patch({
			theme: this.#currentTheme.name,
			customTheme: this.#currentTheme.custom
		});
	}
}

export default new Themes();
