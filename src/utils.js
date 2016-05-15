/* Collection of utility functions for querying DOM */

var utils = {};

utils.qs = function(selector, context) {
  context = context || document;
  return context.querySelector(selector);
};

utils.qsa = function(selectors, context) {
  context = context || document;
  return context.querySelectorAll(selectors);
};

utils.wait = function(ms) {
  ms = ms || 500;
  return new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      resolve();
    }, ms);
  });
};

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
};

module.exports = utils;
