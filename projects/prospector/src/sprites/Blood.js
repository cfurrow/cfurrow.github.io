export default class Blood extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'blood');

    this.visible = false;
    this.scale.set(1,1);
    this.anchor.set(0.5,0.5);
    this.smoothed = false;
    this.z = 0;

    var bloodAnimation = this.animations.add('squirt', [0,5,10], 10, false);

    // /bloodAnimation.onComplete.add(function(sprite, animation){ sprite.visible=false; }, this);
  }
}
