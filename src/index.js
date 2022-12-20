import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import express from 'express';

dotenv.config();

const app = express();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1d' });
}

app.post('/api/createNewUser', (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
});

app.listen(3000, () => console.log('Ready on port 3000'));
