import jsonwebtoken from 'jsonwebtoken';

const verifyTokenUser = (token, isRefresh = false) => {
  try {
    return jsonwebtoken.verify(
      token,
      isRefresh ? process.env.JWT_SECRET_REFRESH : process.env.JWT_SECRET,
    );
  } catch {
    return undefined;
  }
};

const authSignUser = (user) => {
  const id = Buffer.from(
    `${user[String.fromCharCode(95, 105, 100)]}:${user.username}`,
    'utf8',
  ).toString('base64');
  const token = jsonwebtoken.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30m',
    },
  );

  const refreshToken = jsonwebtoken.sign(
    {
      id,
    },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: '1d' },
  );

  return {
    token,
    refreshToken,
  };
};

const renewTokenUser = (refreshToken) => {
  const verifyAndDecoded = verifyTokenUser(refreshToken, true);
  if (!verifyAndDecoded) return 'invalid refresh token';

  const newAccessToken = jsonwebtoken.sign(
    {
      id: verifyAndDecoded.id,
    },
    process.env.JWT_SECRET_REFRESH,
  );

  return { token: newAccessToken };
};

export default {};
export { authSignUser, verifyTokenUser, renewTokenUser };
