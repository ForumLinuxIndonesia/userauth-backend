import 'dotenv/config';
import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import logger from './logger.js';
import DB from './database.js';
import { validateNotNullObjects } from './validation.js';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  }),
);

app.get('/', (req, res) => {
  try {
    return res.send({ success: true });
  } catch (error) {
    logger.error(error);

    return res.status(500).send({
      success: false,
      message: `Failed to process request ${req.url}`,
    });
  }
});

// Endpoint to create/register new user
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

    const validationMessage = validateNotNullObjects(dataUser);
    if (validationMessage) {
      return res
        .status(400)
        .send({ success: false, message: validationMessage });
    }

    const usedNameOrMail = await DB.findOne({
      $or: [
        {
          username: dataUser.username,
        },
        {
          email: dataUser.email,
        },
      ],
    }).lean();

    if (usedNameOrMail) {
      return res
        .status(400)
        .json({ success: false, message: 'Username or email is already used' });
    }

    const hash = await bcrypt.hash(dataUser.password, 10);
    dataUser.password = hash;

    await DB.create(dataUser);

    return res
      .status(200)
      .send({ success: true, message: 'Account success created' });
  } catch (error) {
    logger.error(error);

    return res.status(500).send({
      success: false,
      message: `Failed to process request ${req.url}`,
    });
  }
});

app.listen(Number(process.env.LISTEN_PORT) || 3000, () => console.log(`Ready on port ${process.env.LISTEN_PORT || 3000}`));
