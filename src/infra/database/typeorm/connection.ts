import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV === 'test' ? 'test' : 'default',
  );

  return createConnection({
    ...options,
    name: 'default',
    migrationsRun: true,
  });
};
