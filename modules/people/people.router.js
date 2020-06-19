const express = require('express');
const json = require('body-parser').json();

const People = require('./people.service');

const router = express.Router();

router.get('/', (req, res, next) => {
  return People.get()
    .then(people => {
      res.json(people);
    })
    .catch(next);
});

router.post('/', json, (req, res, next) => {
  const { person } = req.person;
  return People.enqueue(person)
    .then(returnedPerson => {
      res
        .status(201)
        .json(returnedPerson);
    })
    .catch(next);
});

router.delete('/', (req, res, next) => {
  return People.dequeue()
    .then(() => {
      res
        .status(204)
        .json(People.get());
    })
    .catch(next);
});

module.exports = router;
