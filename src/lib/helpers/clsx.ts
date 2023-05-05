export const clsx = (...cls: (string | boolean)[]) => {
  return cls.filter((it) => typeof it === 'string').join(' ');
};
