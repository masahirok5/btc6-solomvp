const knex = require('knex');
const knexConfig = require('./knexfile');
require('dotenv').config();

const environment = process.env.DATABASE_URL ? 'production' : 'development';

module.exports = knex(knexConfig[environment]);
