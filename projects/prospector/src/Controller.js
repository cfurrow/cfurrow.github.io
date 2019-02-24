import Phaser from 'phaser';

class InputState {
  get isDown() {
    return this.keys.reduce(this.downReducer, false);
  }

  get isUp() {
    return this.keys.reduce(this.upReducer, false);
  }

  constructor(keys) {
    this.keys = keys;
    this.upReducer   = function(result, currentKey) {
      return result || currentKey.isUp;
    };
    this.downReducer = function(result, currentKey) {
      return result || currentKey.isDown;
    }
  }
}

export default class {
  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  get up() {
    return this._up;
  }

  get down() {
    return this._down;
  }

  get space() {
    return this._space;
  }

  constructor(game) {
    this.game = game;
    this.keyboard = game.input.keyboard;


    this.setupKeys();
    game.input.onTap = this.onTap;
    game.input.onTap = this.onUp;

    this._left  = new InputState([this.keys.left,  this.keys.left_alt]);
    this._right = new InputState([this.keys.right, this.keys.right_alt]);
    this._up    = new InputState([this.keys.up,    this.keys.up_alt]);
    this._down  = new InputState([this.keys.down,  this.keys.down_alt]);
    this._space = new InputState([this.keys.space]);

    console.log("Controller setup", this)
  }

  onTap(pointer, doubleTab) {
    
  }

  onUp(pointer, event) {

  }

  setupKeys() {
    this.keys = this.keyboard.addKeys({
      'up':        Phaser.KeyCode.UP,
      'down':      Phaser.KeyCode.DOWN,
      'left':      Phaser.KeyCode.LEFT,
      'right':     Phaser.KeyCode.RIGHT,
      'up_alt':    Phaser.KeyCode.W,
      'down_alt':  Phaser.KeyCode.S,
      'left_alt':  Phaser.KeyCode.A,
      'right_alt': Phaser.KeyCode.D,
      'action':    Phaser.KeyCode.SPACEBAR,
      'space':     Phaser.KeyCode.SPACEBAR
    });
  }
}
