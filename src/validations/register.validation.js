import { createAjv } from '#validations/create.js';

const $registerValidation = createAjv({
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      pattern: '[a-zA-Z]+',
    },
    lastName: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      default: '',
      pattern: '[a-zA-Z]+',
    },
    email: {
      type: 'string',
      maxLength: 50,
      pattern:
        '^[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 50,
    },
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
    },
  },
  required: ['username', 'email', 'password'],
});

export default $registerValidation;
export { $registerValidation };
