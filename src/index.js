import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import logger from '#utils/logger.js';
import { connectToDB } from '#utils/database.js';

import $api from '#routes/api.js';

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
    return res.send({ ok: true });
  } catch (error) {
    logger.error(error);

    return res.status(500).send({
      ok: false,
      message: `Failed to process request ${req.url}`,
    });
  }
});

app.use('/api', $api);

app.listen(Number(process.env.LISTEN_PORT) || 3000, async () => {
  await connectToDB();
  console.log(`Ready on port ${process.env.LISTEN_PORT || 3000}`);
});
