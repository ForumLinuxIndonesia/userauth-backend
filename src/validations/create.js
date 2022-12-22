import Ajv from 'ajv/dist/2019.js';

const createAjv = (schema) => {
  const ajv = new Ajv();

  return ajv.compile(schema);
};

export default createAjv;
export { createAjv };
