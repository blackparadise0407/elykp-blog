export const env = {
  pbUrl: import.meta.env.VITE_APP_PB_URL || 'http://127.0.0.1:8090'
} as const;
