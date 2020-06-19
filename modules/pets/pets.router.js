const express = require('express');
const json = require('body-parser').json();

const Pets = require('./pets.service');
const People = require('../people/people.service');

const router = express.Router();

router
  .route('/cats')
  .get((req, res, next) => {
    return Pets.allCats()
      .then(cats => {
        res.json(cats);
      })
      .catch(next);
  });

router
  .route('/cats/cat')
  .get((req, res, next) => {
    return Pets.getCat()
      .then(cat => {
        res.json(cat);
      })
      .catch(next);
  })
  .delete(json, (req, res, next) => {
    return Pets.dequeue(cat)
      .then(() => {
        People.dequeue();
      })
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

router
  .route('/dogs')
  .get((req, res, next) => {
    return Pets.allDogs()
      .then(dogs => {
        res.json(dogs);
      })
      .catch(next);
  });

router
  .route('/dogs/dog')
  .get((req, res, next) => {
    return Pets.getDog()
      .then(dog => {
        res.json(dog);
      })
      .catch(next);
  })
  .delete(json, (req, res, next) => {
    return Pets.dequeue('dog')
      .then(() => {
        People.dequeue();
      })
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });
  
module.exports = router;
