import ow from 'ow';

const $validationMiddleware = (...validations) => {
  if (!Array.isArray(validations)) throw new TypeError('Invalid validations');
  return async (req, res, next) => {
    try {
      validations.forEach((validation) => {
        ow(req.body, validation);
      });

      return next();
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  };
};

export default $validationMiddleware;
export { $validationMiddleware };
