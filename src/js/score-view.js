'use strict';

var utils = require('./utils');

// Score-view.js - Render the scoreboard in the header

function ScoreView(header) {
  this.$playerTurns = utils.qsa('TTT-hdr-player', header);
  this.$playerScores = utils.qsa('TTT-hdr-player-score', header);
}

ScoreView.prototype.render = function(whatToRender, data) {
  this[whatToRender](data);
};

ScoreView.prototype.turn = function(turn) {
  if (turn === 'o') {
    this.$playerTurns[1].classList.remove('TTT--active');
    this.$playerTurns[0].classList.add('TTT--active');
  } else {
    this.$playerTurns[0].classList.remove('TTT--active');
    this.$playerTurns[1].classList.add('TTT--active');
  }
};

ScoreView.prototype.score = function(score) {
  this.$playerScores[0].innerHtml = score.x;
  this.$playerScores[1].innerHtml = score.o;
};

module.exports = function(header) {
  return new ScoreView(header);
};
