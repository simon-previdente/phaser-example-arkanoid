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

var ball = null;

function _preload() {
  // console.log('💤 Preload game');
  game.load.image('ball','game/assets/ball.png');
}

function _create() {
  // console.log('✨ Create game');

  game.stage.backgroundColor = '#363343';

  ball = game.add.sprite(400, 200, 'ball');
  ball.scale.set(SCALE);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
}

function _update() {
  // console.log('🔄 Update game');
  ball.x += 2;
}