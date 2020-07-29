const Queue = require('../queue/Queue');
const store = require('../../store');

// Set up initial data.
// --------------------

const pets = {
  cats: new Queue(),
  dogs: new Queue()
};

store.cats.forEach(cat => pets.cats.enqueue(cat));
store.dogs.forEach(dog => pets.dogs.enqueue(dog));

// --------------------

module.exports = {
  allCats() {
    return pets.cats.all();
  },

  getCat() {
    return pets.cats.show();
  },

  allDogs() {
    return pets.dogs.all();
  },

  getDog() {
    return pets.dogs.show();
  },

  dequeue(type) {
    if (type === 'cat') {
      const cat = pets.cats.dequeue();
      pets.cats.enqueue(cat);
    }
    if (type === 'dog') {
      const dog = pets.dogs.dequeue();
      pets.dogs.enqueue(dog);
    }
  }
};
