import bcrypt from 'bcrypt';
import { UserModel } from '#models/user.js';
import { authSignUser } from '#services/auth.service.js';

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await UserModel.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });

  if (!user)
    return res
      .status(401)
      .json({ ok: false, message: "Couldn't find that user" });

  const hashCompare = await bcrypt.compare(password, user.password);
  if (!hashCompare)
    return res.status(401).json({ ok: false, message: 'Invalid credentials' });

  const token = authSignUser(user);
  return res.status(201).json({ ok: true, data: token });
};

export default loginController;
export { loginController };
