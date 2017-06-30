// ES5
// Functional to Object-oriented

// Encapsulation
// Module pattern (IIFE)

// Object Creation
// Constructor

// Object Expandability
// prototype


// IE9+ compatible
const Beatle = (function(window) {
  'use strict';

  // Encapsulated variables
  const document = window.document;
  const toString = Object.prototype.toString;
  const from = Array.prototype.from;
  const slice = Array.prototype.slice;
  const forEach = Array.prototype.forEach;


  // Constructor function
  // Not forcing 'new' keywords
  // Using factory function pattern
  function Beatle(args) {

  }

  Beatle.prototype = {

    a() {
      this[0] = "hello";
      return this;
    },

    b() {
      this[0] += "There";
      return this;
    }
  }
  return new Beatle();

})(window);
