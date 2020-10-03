import env from 'dotenv';
import { createConnection } from 'typeorm';

env.config({
  path: `.env.${process.env.NODE_ENV}`,
});

createConnection();
