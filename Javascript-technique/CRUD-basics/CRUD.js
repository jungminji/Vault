/*! Jungmin Ji */
// data management pattern library
// CRUD(Create, Read, Update, Delete)

// API
// private: state
// public: .add(data), .get([index]), .update(index, fixed_data), .remove([index])


// Function constructor and prototype pattern will be used

const Bottle = (function(window) {
  'use strict';

  // Encapsulation, private members
  let state = [];

  // Constructor
  function Bottle(data) {
    // Pass data to init methods for validation
    this.init(data);
  }

  // Public methods in Bottle.prototype
  // This works because Bottle.prototype is already been in memory when I write the function statement above
  Bottle.prototype = {
    constructor: Bottle,  // This is recommended to write, when you have to validate where this instance came from.
    init(data) {
      // Takes only Array type data
      if (Array.isArray(data)) {
        state = data;
      }
    },
    add(data) {
      data && state.push(data);
      return state;
    },
    get(index) {

      if (!typeof index === 'number' || index < 0) {
        throw 'Positive number only';
      }

      return index === undefined ? state : state[index];

    },
    update(index, data) {
      data && state.splice(index, 1, data);
      return state;
    },
    remove(index) {
      data && state.pop(index);
      return state;
    }
  }

  // returns the constructor function of Bottle
  return Bottle;

})(window);

const deux = new Bottle([1, 10, 100, 50]);
