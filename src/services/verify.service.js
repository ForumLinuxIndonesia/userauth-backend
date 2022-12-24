import { UserModel } from '#models/user.js';

const verifyUser = async (body) => {
  const matchVerifyCode = await UserModel.findOne({
    verifyCode: body.verifyCode,
  });
  if (!matchVerifyCode) return { ok: false, message: 'Verify Code not found' };

  if (matchVerifyCode.isVerified) return { ok: true, message: 'User Already Verified' };

  matchVerifyCode.isVerified = true;

  await matchVerifyCode.save();

  return { ok: true, message: 'Successfuly verified' };
};

export default verifyUser;
export { verifyUser };
