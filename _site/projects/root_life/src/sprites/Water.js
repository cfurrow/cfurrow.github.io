import Phaser from 'phaser';

export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'water');

    if(typeof(this.anims.animationManager.get('ripple')) === 'undefined') {
      const animationConfig = { key: 'ripple',
                                frames: this.anims.animationManager.generateFrameNumbers('water', {start: 0, end: 3}),
                                frameRate: 4,
                                repeatDelay: 500,
                                repeat: -1
                              };
      this.anims.animationManager.create(animationConfig);
    }

    this.anims.play('ripple');

    this.x = config.x;
    this.y = config.y;

    this.scene.physics.add.existing(this, true);
    this.scene.add.existing(this);
  }
}
