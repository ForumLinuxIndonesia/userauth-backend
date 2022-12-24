import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserModel } from '#models/user.js';
import { sendVerifyCode } from '#utils/mailer.js';

const createUser = async (body) => {
  const usedNameOrMail = await UserModel.findOne({
    $or: [
      {
        username: body.username.toLowerCase(),
      },
      {
        email: body.email,
      },
    ],
  }).lean();

  if (usedNameOrMail) return { ok: false, message: 'Username or email is already exists!' };
  const data = new UserModel(body);

  data.password = await bcrypt.hash(body.password, 10);
  data.verifyCode = crypto.randomBytes(4).toString('hex');
  data.isVerified = false;
  await data.save();

  await sendVerifyCode({ to: data.email, verifyCode: data.verifyCode });

  return { ok: true, message: 'Successfuly created' };
};

export default createUser;
export { createUser };
