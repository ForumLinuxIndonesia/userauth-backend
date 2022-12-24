import { createUser } from '#services/users.service.js';

const registerController = async (req, res) => {
  const result = await createUser(req.body);
  return res.status(result.ok ? 201 : 401).json(result);
};

export default registerController;
export { registerController };
