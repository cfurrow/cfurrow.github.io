import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Group {
  get tail() {
    return this.rootEndSprite;
  }

  get body() {
    return this.rootEndSprite.body;
  }

  get events() {
    return this._events;
  }

  constructor(config) {
    super(config.scene);

    this.controllerEnabled = false;
    this.scene = config.scene;

    this.x = config.x;
    this.y = config.y;
    this.active = false;
    this._verticalVelocity = 10;
    this._horizontalVelocity = 2;

    this.lastSprite = this.create(this.x, this.y, 'blank');
    this.rootEndSprite = null;

    this.lastRootPlacementY = 0;

    this._events = new Phaser.Events.EventEmitter();
  }

  on(eventName, handler, context) {
    this.events.on(eventName, handler, context);
  }

  enableController() {
    this.controllerEnabled = true;
  }

  grow(x, y) {
    console.log("[Root] Begin growing...");

    this.rootEndSprite = this.scene.physics.add.sprite(x, y, 'root', 1);
    this.rootEndSprite.setCollideWorldBounds(true);
    this.rootEndSprite.body.setVelocityY(this._verticalVelocity);
    this.add(this.rootEndSprite, true);

    this.active = true;
  }

  update(config) {
    let controller = config.controller;
    if(!this.active) {
      return;
    }
    if(!this.rootEndSprite) {
      return;
    }

    this.rootEndSprite.body.setVelocityX(0);

    if(this.controllerEnabled) {
      if(controller.left.isDown) {
        this.rootEndSprite.body.setVelocityX(-this._horizontalVelocity);
      }
      if(controller.right.isDown) {
        this.rootEndSprite.body.setVelocityX(this._horizontalVelocity);
      }
    }

    // Stop placing a sprite on every single frame.
    if(this.rootEndSprite.y - this.lastSprite.y > 6) {
      this.lastSprite = this.create(this.rootEndSprite.x, this.rootEndSprite.y-this.rootEndSprite.displayHeight-1, 'root', 0);
      this.lastSprite.angle = this.rootEndSprite.angle;
      this.lastSprite.setOrigin(0.5, 0);
      this.events.emit('grow');
    }
  }
}
