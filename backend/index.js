const express = require('express');
const knex = require('./db');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use('/', express.static('../frontend/dist'));

app.get('/member/:id', async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  const members = await knex('member').select('');
  res.send(members);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
