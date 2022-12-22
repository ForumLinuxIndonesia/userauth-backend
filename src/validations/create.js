import Ajv from 'ajv';

const createAjv = (schema) => {
  const ajv = new Ajv();

  return ajv.compile(schema);
};

export default createAjv;
export { createAjv };
