import { writable } from 'svelte/store';

interface ToastOptions {
  variant?: ToastVariant;
}

interface EnqueueFn {
  (message: string, opts?: ToastOptions): void;
}

interface RemoveFn {
  (id: string): void;
}

export const toastStore = writable<Toast[]>([]);

export const enqueue: EnqueueFn = (msg, opts = {}) => {
  toastStore.update((prev) => [
    ...prev,
    {
      id: String(Date.now() + Math.floor(Math.random() * 1000)),
      message: msg,
      variant: opts.variant ?? 'success'
    }
  ]);
};

export const remove: RemoveFn = (id) => {
  toastStore.update((prev) => {
    const clone = [...prev];
    const foundIdx = clone.findIndex((it) => it.id === id);
    if (foundIdx > -1) {
      clone.splice(foundIdx, 1);
    }
    return clone;
  });
};
