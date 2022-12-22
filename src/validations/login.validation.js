import { createAjv } from '#validations/create.js';

const $loginValidation = createAjv({
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: 'string',
      pattern:
        '^[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 100,
    },
  },
  dependentRequired: {
    username: ['password'],
    email: ['password'],
  },
});

export default $loginValidation;
export { $loginValidation };
