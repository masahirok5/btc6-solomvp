const knex = require('knex');
const knexConfig = require('./knexfile');
require('dotenv').config({ path: '../.env' });

const environment = process.env.DATABASE_URL ? 'production' : 'development';

module.exports = knex(knexConfig[environment]);
