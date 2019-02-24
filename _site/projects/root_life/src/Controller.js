"use strict";

function IsDownHelper(signals) {
  let atLeastOneDown = (signal)=> signal;
  let result = signals.find(atLeastOneDown);

  return {
    isDown: result
  };
}

export default class {

  get left() {
    return IsDownHelper([this.keyboard.left.isDown, this.pointerLeft]);
  }

  get right() {
    return IsDownHelper([this.keyboard.right.isDown, this.pointerRight]);
  }

  constructor(config) {
    this.scene = config.scene;
    this.enabled = config.enabled;
    let camera = this.scene.cameras.main;

    this.keyboard = this.scene.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    this.scene.input.on('pointerdown', (pointer) => {
      this.pointerLeft = false;
      this.pointerRight = false;
      if(pointer.x <= camera.width / 2) {
        this.pointerLeft  = true;
      } else {
        this.pointerRight = true;
      }
    });
    this.scene.input.on('pointerup', (pointer) => {
      this.pointerLeft = false;
      this.pointerRight = false;
    });
  }

  update() {

  }
}
