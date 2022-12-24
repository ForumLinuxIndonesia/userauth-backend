import { Router } from 'express';

import { $validationMiddleware } from '#middlewares/validation.middleware.js';
import { $registerValidation } from '#validations/register.validation.js';
import { $loginValidation } from '#validations/login.validation.js';
import { $verifyValidation } from '#validations/verify.validation';

import $registerController from '#controllers/register.controller.js';
import $loginController from '#controllers/login.controller.js';
import $refreshController from '#controllers/refresh.controller.js';
import $verifyController from '#controllers/verify.controller.js';

const $api = new Router();

$api.get('/', (_, res) => res.status(200).json({ message: 'Hello World' }));
$api.post(
  '/register',
  $validationMiddleware($registerValidation),
  $registerController,
);
$api.post('/login', $validationMiddleware($loginValidation), $loginController);
$api.post('/refresh', $refreshController);
$api.post('/verify', $validationMiddleware($verifyValidation), $verifyController);

export default $api;
export { $api };
