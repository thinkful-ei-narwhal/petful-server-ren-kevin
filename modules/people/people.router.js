const express = require('express');
const json = require('body-parser').json();

const People = require('./people.service');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.json(People.get());
  })
  .post(json, (req, res) => {
    const { person } = req.body;
    res.status(201).json(People.enqueue(person));
  });

router
  .route('/next')
  .get((req, res) => {
    res.json(People.show());
  })
  .delete((req, res) => {
    People.dequeue();
    res.status(204).end();
  });

module.exports = router;
