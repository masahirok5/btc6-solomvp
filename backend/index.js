const express = require('express');
const knex = require('./db');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 8080;

app.use('/', express.static('../frontend/dist'));

app.get('/member/:id', async (req, res) => {
  const members = await knex('member').select('');
  res.send(members);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
