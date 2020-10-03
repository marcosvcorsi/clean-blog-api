import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const options = await getConnectionOptions(name);

  return createConnection({
    ...options,
    name: 'default',
    migrationsRun: true,
  });
};
