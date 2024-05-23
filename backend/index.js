const express = require('express');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 8081;

app.use('/', express.static('../frontend/dist'));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
