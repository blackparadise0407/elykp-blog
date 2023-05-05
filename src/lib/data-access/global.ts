import { writable } from 'svelte/store';

export const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
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
