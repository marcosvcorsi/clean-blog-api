import 'reflect-metadata';
import express from 'express';

import createConnection from '@/infra/database/typeorm/connection';

const app = express();

app.use(express.json());

createConnection().then(async () => {
  const routes = (await import('./routes')).default;

  app.use(routes);
});

export default app;
