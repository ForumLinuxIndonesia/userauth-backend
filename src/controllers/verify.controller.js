import { verifyUser } from '#services/verify.service.js';

const verifyController = async (req, res) => {
  const result = await verifyUser(req.body);
  return res.status(result.ok ? 201 : 401).json(result);
};

export default verifyController;
export { verifyController };
