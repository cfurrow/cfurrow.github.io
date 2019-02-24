export default class Blocker extends Phaser.Sprite {
  get isCollidable() {
    return true;
  }

  get center() {
    return false
  }

  constructor(game, x, y, properties) {
    super(game, x, y)

    this.properties = properties
    this.width = properties.width;
    this.height = properties.height;
  }

  setupPhysics() {
    this.body.immovable = true;
  }

  collideWith() {
    
  }
}