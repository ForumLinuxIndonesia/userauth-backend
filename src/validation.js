import assert from 'assert';

export const validateNotNullObjects = (object) => {
  if (typeof object !== 'object') return "The entry isn't an object";

  for (const [key, value] of Object.entries(object)) {
    try {
      assert.ok(
        !!value && typeof value !== 'undefined' && value != null,
        `${key} is needed`
      );
    } catch (e) {
      return e.message;
    }
  }

  return undefined;
};
