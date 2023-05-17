import { writable } from 'svelte/store';

export const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'halloween',
  'forest',
  'aqua',
  'luxury',
  'dracula',
  'cmyk',
  'business',
  'lemonade',
  'night',
  'winter'
] as const;

interface GlobalStore {
  fontSize: number;
  lineHeight: number;
  theme: (typeof THEMES)[number];
}

const initialState: GlobalStore = {
  fontSize: 18,
  lineHeight: 40,
  theme: 'light'
};

export const globalStore = writable<GlobalStore>({ ...initialState });

export const resetDefaultSetting = () => {
  globalStore.set({ ...initialState });
};
