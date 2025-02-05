import { browser } from '$app/environment';

const defaultStyles = {
  '--bg-color': '#323437',
  '--main-color': '#e2b714',
  '--sub-color': '#646669',
  '--sub-alt-color': '#2c2e31',
  '--text-color': '#d1d0c5',
  '--error-color': '#ca4754',
  '--error-extra-color': '#7e2a33',
  '--colorful-error-color': '#ca4754',
  '--colorful-error-extra-color': '#7e2a33',
  '--border-radius': '8px'
};

const stylePresets: { [key: string]: { [key: string]: string } } = {
  default: defaultStyles,
  monokai: {
    '--bg-color': '#272822',
    '--main-color': '#a6e22e',
    '--caret-color': '#66d9ef',
    '--sub-color': '#e6db74',
    '--sub-alt-color': '#1f201b',
    '--text-color': '#e2e2dc',
    '--error-color': '#f92672',
    '--error-extra-color': '#fd971f',
    '--colorful-error-color': '#f92672',
    '--colorful-error-extra-color': '#fd971f'
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
