import argon2 from 'argon2';
import crypto from 'crypto';
import { UserModel } from '#models/user.js';

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

  data.password = await argon2.hash(body.password);
  data.verifyCode = crypto.randomBytes(4).toString('hex');
  data.isVerified = false;
  await data.save();

  return {
    ok: true,
    message: 'Successfuly created',
    data: {
      verifyLink: `localhost:${process.env.LISTEN_PORT}/api/verify`,
      type: 'post',
      verifyCode: data.verifyCode,
    },
  };
};

export default createUser;
export { createUser };
