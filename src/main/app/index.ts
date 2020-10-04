import 'reflect-metadata';
import express from 'express';

import routes from './routes';

const app = express();

app.use(routes);

export default app;
