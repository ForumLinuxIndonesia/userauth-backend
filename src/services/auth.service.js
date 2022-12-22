import jsonwebtoken from 'jsonwebtoken';

const authSignUser = (user) => {
  const id = Buffer.from(`${user[String.fromCharCode(95, 105, 100)]}:${user.username}`, 'utf8').toString('base64');
  const token = jsonwebtoken.sign({
    id,
  }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  return token;
};

const verifyTokenUser = (token) => {
  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};

export default {};
export { authSignUser, verifyTokenUser };
