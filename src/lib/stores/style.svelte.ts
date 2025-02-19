import { browser } from '$app/environment';

const defaultStyles = {
	'--background-color': '#323437',
	'--main-color': '#e2b714',
	'--sub-color': '#646669',
	'--sub-alt-color': '#2c2e31',
	'--text-color': '#d1d0c5',
	'--error-color': '#ca4754',
	'--border-radius': '8px',
	'--white': '#fff',
	'--yellow': '#f7c331',
	'--green': '#2ecc71',
	'--blue': '#3498db',
	'--red': '#e74c3c',
	'--orange': '#f39c12'
};

const stylePresets: { [key: string]: { [key: string]: string } } = {
	'serika dark': defaultStyles,
	monokai: {
		'--background-color': '#272822',
		'--main-color': '#a6e22e',
		'--caret-color': '#66d9ef',
		'--sub-color': '#e6db74',
		'--sub-alt-color': '#1f201b',
		'--text-color': '#e2e2dc',
		'--error-color': '#f92672',
		'--white': '#fff',
		'--yellow': '#f7c331',
		'--green': '#2ecc71',
		'--blue': '#3498db',
		'--red': '#e74c3c',
		'--orange': '#f39c12'
	},
	tangerine: {
		'--background-color': '#ffede0',
		'--main-color': '#fe5503',
		'--caret-color': '#5d8500',
		'--sub-color': '#ff9562',
		'--sub-alt-color': '#fdd3bf',
		'--text-color': '#3d1705',
		'--error-color': '#7fb500',
		'--white': '#fff',
		'--yellow': '#f7c331',
		'--green': '#2ecc71',
		'--blue': '#3498db',
		'--red': '#e74c3c',
		'--orange': '#f39c12'
	},
	dots: {
		'--background-color': '#121520',
		'--main-color': '#fff',
		'--sub-color': '#676e8a',
		'--sub-alt-color': '#1b1e2c',
		'--text-color': '#fff',
		'--error-color': '#da3333',
		'--white': '#fff',
		'--yellow': '#f7c331',
		'--green': '#2ecc71',
		'--blue': '#3498db',
		'--red': '#e74c3c',
		'--orange': '#f39c12'
	}
};

let styleStore = $state<{ [key: string]: string }>(defaultStyles);

function set(newStyles: { [key: string]: string }) {
	styleStore = newStyles;
}

function save() {
	if (browser) {
		localStorage.setItem('styles', JSON.stringify(styleStore));
	}
}

function load() {
	const savedStyles = localStorage.getItem('styles');
	if (savedStyles) {
		Object.assign(styleStore, JSON.parse(savedStyles));
	} else {
		styleStore = defaultStyles;
	}
	for (const [key] of Object.entries(styles.default)) {
		document.documentElement.style.setProperty(key, styleStore[key]);
	}
}

function reset() {
	styleStore = defaultStyles;
	save();
}

function createStyleStore() {
	return {
		get current() {
			return styleStore;
		},
		get default() {
			return defaultStyles;
		},
		get presets() {
			return stylePresets;
		},
		set,

		load,
		save,
		reset
	};
}

export const styles = createStyleStore();
