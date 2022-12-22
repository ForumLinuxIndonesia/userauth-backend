import { createService } from '#services/users.service.js';

const $registerController = async (req, res) => {
  const result = await createService(req.body);
  return res.status(result.ok ? 204 : 400).json(result);
}

export default $registerController;

