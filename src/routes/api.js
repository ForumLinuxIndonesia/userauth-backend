import { Router } from 'express';

import { $validationMiddleware } from '#middlewares/validation.middleware.js';
import { $registerValidation } from '#validations/register.validation.js';

import $registerController from '#controllers/register.controller';

const $api = new Router();

$api.get('/', (_, res) => res.status(200).json({ message: 'Hello World' }));
$api.post('/register', $validationMiddleware($registerValidation), $registerController);

export default $api;
