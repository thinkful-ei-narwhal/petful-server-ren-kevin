const express = require('express');
const json = require('body-parser').json();

const Pets = require('./pets.service');
const People = require('../people/people.service');

const router = express.Router();


router
  .route('/cats')
  .get((req, res, next) => {
    res.json(Pets.allCats());
  });

router
  .route('/cats/next')
  .get((req, res, next) => {
    res.json(Pets.getCat());
  })
  .delete(json, (req, res, next) => {
    Pets.dequeue('cat');
    People.dequeue();
    res.status(204).end();
  });

router
  .route('/dogs')
  .get((req, res, next) => {
    res.json(Pets.allDogs());
  });

router
  .route('/dogs/next')
  .get((req, res, next) => {
    res.json(Pets.getDog());
  })
  .delete(json, (req, res, next) => {
    Pets.dequeue('dog');
    People.dequeue();
    res.status(204).end();

  });
  
module.exports = router;
