import winston from 'winston';
import { existsSync, mkdirSync } from 'fs';

if (!existsSync('logs')) {
  mkdirSync('logs');
}

const logger = winston.createLogger({
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
