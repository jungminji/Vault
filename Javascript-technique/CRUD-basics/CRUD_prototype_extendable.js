const Model = function(window) {
  'use strict';

  // Constructor
  function Model() {};

  // Static methods(constructor methods, or class methods)
  Model.include = function(key, value) {
    if (key && typeof key === 'string') {
      Model[key] = value;
    }
    if (key && !key.length && typeof key === 'object') {
      for (let prop in key) {
        if (key.hasOwnProperty(prop)) {
          Model[key] = key[prop];
        }
      }
    }
  }

  // Prototype object, Extendable
  // In this case, you don't have to set constructor
  Model.prototype.version = '0.0.1';
  Model.prototype.init = function() {};


  Model.fn = Model.prototype

  // Using pattern below re-assign the prototype object.
  // Therefore, you have to explicitly set constructor
  // Model.fn = {
  //   constructor: Model,
  // }



  // Disclose constructor
  return Model;

}(window);
