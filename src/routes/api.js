import { Router } from 'express';

const $api = new Router();

$api.get('/', (_, res) => res.status(200).json({ message: 'Hello World' }));

export default $api;
