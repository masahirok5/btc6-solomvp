require('dotenv').config({
  path: '../.env',
});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER || 'user',
      database: process.env.POSTGRES_DB || 'solomvp_db',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      user: 'postgres',
      password: process.env.DATABASE_pass,
      database: 'solomvp_db',
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
