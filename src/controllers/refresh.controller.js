import { renewTokenUser } from '#services/auth.service.js';

const refreshController = async (req, res) => {
  const token = req.headers['x-refresh-token']?.split(' ').at(-1);

  if (!token) {
    return res
      .status(400)
      .json({ ok: false, message: 'missing refresh token' });
  }
  const result = renewTokenUser(token);

  if (typeof result === 'string') return res.status(401).json({ ok: false, message: result });
  return res.status(200).json({ ok: true, data: result });
};

export default refreshController;
export { refreshController };
