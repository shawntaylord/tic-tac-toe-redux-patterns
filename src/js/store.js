// Store.js - single source of state
var reducers = require('./reducers');

/* subscribers
  list of functions to pass state and action to on dispatch
*/
var subscribers = [];

function Store() {
  this.prevState = {};
  this.state = this.update({}, {}); // initialize state object
};

Store.prototype.getState = function() {
  return this.state;
};

Store.prototype.getPrevState = function() {
  return this.prevState;
};

/* dispatch
  Updates the store's state, creating a new `prevState`. Notifies all
  subscribers of this change via `notifySubscribers`.
*/
Store.prototype.dispatch = function(action) {
  this.prevState = this.state;
  this.state = this.update(this.state, action);

  this.notifySubscribers();
}

/* notifySubscribers
  When a state change/update to the store occurs, all subscibers must be
  notified of the change in order to take action. (ie. change the view)
*/
Store.prototype.notifySubscribers = function() {
  subscribers.forEach(function(subscriber) {
    subscriber(this.prevState, this.state);
  }.bind(this));
};

/* subscribe
  When a method needs to be called on a state change/store update, add that
  function to a list of subscribers. Each function in this list will be passed
  the new state when `dispatch` is called. (ie. a state change occurs)
*/
Store.prototype.subscribe = function(fn) {
  subscribers.push(fn);
};

/* update
  Returns new state object where each field is updated by a pure function
  (reducer). Called when `dispatch` is called.
*/
Store.prototype.update = function(state, action) {
  return {
    grid: reducers.updateGrid(state.grid, action),
    turn: reducers.updateTurn(state.turn, action),
    score: reducers.updateScore(state.score, action),
    winningSequence: reducers.updateWinningSequence(state.winningSequence, action),
    player: reducers.updatePlayer(state.player, action),
    turnCounter: reducers.updateTurnCounter(state.turnCounter, action)
  };
};

module.exports = new Store();
