const validateNotNullObjects = (object) => {
  if (typeof object !== 'object') return "The entry isn't an object";

  const nullValue = Object.entries(object).find(
    ([, value]) => !value || value == null || typeof value === 'undefined',
  );
  if (nullValue) return `${nullValue[0]} is needed`;
  return undefined;
};

export { validateNotNullObjects };
export default {};
