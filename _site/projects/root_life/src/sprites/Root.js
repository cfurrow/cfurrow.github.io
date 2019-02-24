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

    this.rootEndSprite = null;
    this.graphics = this.scene.add.graphics();
    this.path = null;

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

    this.path = this.scene.add.path(x,y);

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

    // Do not grow on every single frame.
    let endPoint = this.path.getEndPoint();
    let x0 = endPoint.x;
    let y0 = endPoint.y;
    if(this.rootEndSprite.y - y0 > 3) {
      this.graphics.clear();

      let x1 = this.rootEndSprite.x;
      let y1 = this.rootEndSprite.y;

      this.path.moveTo(x0,y0-0.3);
      this.path.lineTo(x1,y1);

      this.graphics.lineStyle(2, 0xfbf236, 1);
      this.path.draw(this.graphics);

      this.events.emit('grow');
    }
  }
}
