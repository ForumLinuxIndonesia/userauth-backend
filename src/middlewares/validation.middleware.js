const $validationMiddleware = (...validations) => {
  if (!Array.isArray(validations)) throw new TypeError('Invalid validations');
  return async (req, res, next) => {
    try {
      const execute = validations.find((v) => !v(req.body));
      if (execute) {
        return res
          .status(400)
          .json({ ok: false, success: 'incorrect payload' });
      }

      return next();
    } catch (e) {
      return res.status(400).json({ ok: false, message: e.message });
    }
  };
};

export default $validationMiddleware;
export { $validationMiddleware };
