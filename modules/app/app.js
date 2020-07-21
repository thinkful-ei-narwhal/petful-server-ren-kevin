const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const store = require('../../store');
const { NODE_ENV } = require('../../config');
const CLIENT_ORIGIN = require('../../config');

const app = express();

app.use(cors({
  origin: CLIENT_ORIGIN
}));

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use('/people', require('../people/people.router'));
app.use('/pets', require('../pets/pets.router'));
app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// app.use((error, req, res, next) => {
//   let response;
//   if (process.env.NODE_ENV === 'production') {
//     response = { error: { message: 'server error' }};
//   } else {
//     response = { error };
//   }
//   res.status(500).json(response);
// });

module.exports = app;
