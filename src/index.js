import 'dotenv/config';
import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
// import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import logger from './logger';
import DB from './database';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
}));

app.get('/', (req, res) => {
  try {
    return res.send({ success: true });
  } catch (error) {
    logger.error(error);

    return res.status(500).send({ success: false, message: `Failed to process request ${req.url}` });
  }
});

app.post('/api/newuser', async (req, res) => {
  try {
    const { body } = req;

    const dataUser = {
      dateCreated: new Date(),
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const dataEntries = Object.entries(dataUser);

    for (let i = 0; i < dataEntries.length; i++) {
      const [key, value] = dataEntries[i];
      if (value === undefined || value === null || !value) {
        logger.warn(`"${key}" not included`);
        return res.status(400).send({ success: false, message: `Param "${key}" is needed!` });
      }
    }

    const usedUsername = await DB.findOne({ username: dataUser.username }).lean();

    if (usedUsername) {
      return res.status(400).send({ success: false, message: 'Username already used!' });
    }

    const usedEmail = await DB.findOne({ email: dataUser.email }).lean();

    if (usedEmail) {
      return res.status(400).send({ success: false, message: 'Email already used!' });
    }

    const hash = await bcrypt.hash(dataUser.password, 10);

    dataUser.password = hash;

    await new DB(dataUser).save();

    return res.status(200).send({ success: true, message: 'Account success created' });
  } catch (error) {
    logger.error(error);

    return res.status(500).send({ success: false, message: `Failed to process request ${req.url}` });
  }
});

app.listen(Number(process.env.LISTEN_PORT) || 3000, () => console.log(`Ready on port ${process.env.LISTEN_PORT || 3000}`));

// function generateAccessToken(username) {
//   return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1d' });
// }

// app.post('/api/createuser', (req, res) => {
//   const token = generateAccessToken({ username: req.body.username });
//   res.json(token);
// });
