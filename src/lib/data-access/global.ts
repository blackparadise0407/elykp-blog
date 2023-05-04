import { writable } from 'svelte/store';

interface GlobalStore {
  fontSize: number;
  lineHeight: number;
}

const initialState: GlobalStore = {
  fontSize: 18,
  lineHeight: 40
};

export const globalStore = writable<GlobalStore>({ ...initialState });

export const resetDefaultSetting = () => {
  globalStore.set({ ...initialState });
};
