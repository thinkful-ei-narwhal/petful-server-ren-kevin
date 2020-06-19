const express = require('express');
const cors = require('cors');
const store = require('../../store');
const CLIENT_ORIGIN = require('./config');

const app = express();

app.use(cors({
  origin: CLIENT_ORIGIN
}));

app.get('/api/cat', (req, res) => {
  res.json(store.cats[0]);
});
app.use('/people', require('../people/people.router'));
app.use('/pets', require('../pets/pets.router'));
app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }};
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

const PORT = process.env.PORT || 8000;
module.exports = app;
