import { createAjv } from '#validations/create.js';

const $verifyValidation = createAjv({
  type: 'object',
  properties: {
    verifyCode: {
      type: 'string',
      minLength: 8,
      maxLength: 8,
    },
  },
  required: ['verifyCode'],
});

export default $verifyValidation;
export { $verifyValidation };
