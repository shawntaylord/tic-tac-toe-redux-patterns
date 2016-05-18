'use strict';

// Utils.js - commong DOM manipulation helpers

var utils = {};

/* qs
  Finds the first DOM element matching the selectors from a given context (ie.
  document or Node)
*/
utils.qs = function(selectors, context) {
  context = context || document;
  return context.querySelector(selectors);
};

/* qsa
  Finds all DOM elements matching the selectors from a given context
*/
utils.qsa = function(selectors, context) {
  context = context || document;
  return context.querySelectorAll(selectors);
};

/* wait
  Returns a Promise after a set amount of time
*/
utils.wait = function(ms) {
  ms = ms || 500;
  return new Promise(function(resolve) {
    window.setTimeout(function() {
      resolve();
    }, ms);
  });
};
