var Phaser = require('phaser');

var SCALE = 3;

var game = new Phaser.Game(
  // Game width
  224 * SCALE,
  // Game height
  192 * SCALE,
  // Game renderer (WebGL, Canvas, auto)
  Phaser.AUTO,
  // Game id in index.html
  'phaser-example-arkanoid',
  // Phaser states
  {
    preload: _preload,
    create: _create,
    update: _update
  },
  // Transparent canvas background
  false,
  // Antialias
  false
);

function _preload() {
  // console.log('💤 Preload game');
}

function _create() {
  // console.log('✨ Create game');

  game.stage.backgroundColor = '#363343';
}

function _update() {
  // console.log('🔄 Update game');
}