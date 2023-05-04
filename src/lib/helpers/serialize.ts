export const serializeNonPOJOs = <T>(val: T) => {
  return structuredClone(val);
};
