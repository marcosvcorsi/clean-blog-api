import 'reflect-metadata';
import express from 'express';

import '@/main/config/env';

import createConnection from '@/infra/database/typeorm/connection';
import { errors } from 'celebrate';

const app = express();

createConnection().then(async () => {
  const routes = (await import('./routes')).default;

  app.use(routes);
  app.use(errors());
});

app.use(express.json());

export default app;
