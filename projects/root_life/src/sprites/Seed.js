import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Sprite {

  get events() {
    return this._events;
  }

  constructor(config) {
    super(config.scene, config.x, config.y, 'seed');

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.angle = config.angle;

    this.scaleX = this.scaleY = 0.5;

    this.active = false;
    this.falling = false;
    this.growing = false;
    this.groundY = config.groundY;

    this._events = new Phaser.Events.EventEmitter();
  }

  on(eventName, handler, context) {
    this.events.on(eventName, handler, context);
  }

  preUpdate(time, delta) {
    if(this.falling) {
      this.angle += this.rotateDirection * 1.5;
      this.y += 0.5;
    }

    if(this.y >= this.groundY) {
      this.falling = false;
      this.growing = true;
    }

    if(this.growing) {
      // hide seed sprite?
      this.active = false;
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.events.emit('planted');
    }
  }
}
