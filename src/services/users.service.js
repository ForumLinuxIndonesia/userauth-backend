import bcrypt from 'bcrypt';
import { UserModel } from '#models/user.js';

const createService = async (body) => {
  const usedNameOrMail = await UserModel.findOne({
    $or: [
      {
        username: body.username.toLowerCase(),
      }, {
        email: body.email,
      },
    ],
  }).lean();

  if (usedNameOrMail) return { ok: false, message: 'Username or email is already exists!' };
  const data = new UserModel(body);

  data.password = await bcrypt.hash(body.password, 10);
  await data.save();

  return { ok: true, message: 'Successfuly created' };
};

export default {};
export { createService };
