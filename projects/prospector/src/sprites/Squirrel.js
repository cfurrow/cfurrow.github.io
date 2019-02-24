import Blood from './Blood';
export default class Squirrel extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'squirrel')
    this.scale.set(2,2);
    this.anchor.set(0.5, 1);
    this.smoothed = false;

    this.animations.add('idle', [0,1,2,3,4,5,6,7], 10, true);
    this.animations.add('run', [32,33,34], 7, true);
    this.animations.play('run');

    this.lastChange = 0;
    this.z = 9
  }

  static preload() {
    game.load.spritesheet('squirrel', 'assets/Monster-squirrel.png', 32, 32, -1);
  }

  static createAtRandom(game) {
    var rnd = game.rnd;
    var x = rnd.between(0,game.world.width);
    var y = rnd.between(0, game.world.height);

    var squirrel = new Squirrel(game, x, y);
    return squirrel;
  }

  onHit(bloodGroup) {
    var blood = new Blood(this.game, this.position.x, this.position.y-10)
    bloodGroup.add(blood);
    var bloodAnimation = blood.animations.getAnimation('squirt');

    blood.visible = true;

    blood.animations.play('squirt');
    this.kill();
  }

  update() {
    var speed = 300;

    var i = this.game.rnd.integerInRange(0,100);
    var now = this.game.time.now;
    var lastChangeDiff = now - this.lastChange;

    if(lastChangeDiff > this.game.rnd.between(300,1200)) {
      this.lastChange = this.game.time.now;
      if(i < 33) {
        this.movingRight = true;
        this.movingLeft = false;
      } else if (i < 66) {
        this.movingRight = false;
        this.movingLeft = true;
      } else {
        this.movingRight = false;
        this.movingLeft = false;
      }
    }

    if(this.movingRight) {
      this.body.velocity.x = speed;
      this.scale.x = Math.abs(this.scale.x);
      this.animations.play('run');
    }else if(this.movingLeft) {
      this.scale.x = -Math.abs(this.scale.x);
      this.body.velocity.x = -speed;
      this.animations.play('run');
    } else {
      this.body.velocity.x = 0;
      this.animations.play('idle');
    }
  }
}
