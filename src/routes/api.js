import { Router } from 'express';

import { $validationMiddleware } from '#middlewares/validation.middleware.js';
import { $registerValidation } from '#validations/register.validation.js';
import { $loginValidation } from '#validations/login.validation.js';

import $registerController from '#controllers/register.controller.js';
import $loginController from '#controllers/login.controller.js';

const $api = new Router();

$api.get('/', (_, res) => res.status(200).json({ message: 'Hello World' }));
$api.post(
  '/register',
  $validationMiddleware($registerValidation),
  $registerController,
);
$api.post('/login', $validationMiddleware($loginValidation), $loginController);

export default $api;
export { $api };
