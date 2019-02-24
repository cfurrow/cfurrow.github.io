import Phaser from 'phaser';

export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'rock', config.frame);

    this.rockFrame = config.frame;

    this.x = config.x;
    this.y = config.y;

    this.scene.physics.add.existing(this, true);
    this.scene.add.existing(this);
    this.setBoundingBox();
  }

  setBoundingBox() {
    let oX, oY, width, height;
    switch(this.rockFrame) {
      case 0:
        oX = 2;
        oY = 2;
        width = 5;
        height = 5;
        break;
      case 1:
        oX = 2;
        oY = 2;
        width = 5;
        height = 5;
        break;
    }
    this.body.setOffset(oX, oY);
    this.body.setSize(width, height);
  }
}
