import Phaser from 'phaser';

export default class extends Phaser.Scene {
  init() {}

  preload() {
    this.flower = this.add.sprite(32, 32, 'tiny_flower', 0);
    this.flower.anims.frameRate = 2;
    this.anims.create({ key: 'flower-grow',
                        frames: this.anims.generateFrameNumbers('tiny_flower', {start: 0, end: 14}),
                        repeat: -1 });
    this.flower.anims.play('flower-grow');

    this.add.text(26, 40, 'loading...', { fontFamily: 'Arial', fontSize: 4, color: '#00cc00', textAlign: 'center' });

    this.load.image('logo2', 'assets/logo2.png');
    this.load.image('sky',   'assets/sky_background.png');
    this.load.image('clouds','assets/sky_clouds.png');
    this.load.image('dirt',  'assets/dirt.png');
    this.load.image('seed',  'assets/seed.png');
    this.load.image('stone', 'assets/stone.png');
    this.load.image('blank', 'assets/blank.png');

    this.load.spritesheet('dirt_edge', 'assets/dirt_edge.png', {frameWidth: 8, frameHeight: 16});
    this.load.spritesheet('root',      'assets/root.png', { frameWidth: 4, frameHeight: 4 });
    this.load.spritesheet('rock',      'assets/rock.png', { frameWidth: 8, frameHeight: 8 });
    this.load.spritesheet('plant',     'assets/plant.png', { frameWidth: 64, frameHeight: 64 });

    this.load.audio('forest_loop', ['assets/sfx/ESM_Forest_Woodland_Loop_Ambience_Nature_Tribal_Organic_Washington_Bird.wav']);
    this.load.audio('bgm', ['assets/sfx/Remotest-Liblary.mp3']);
    this.load.audio('seed_plop', ['assets/sfx/seed_plop.wav']);
    this.load.audio('root_grow', ['assets/sfx/root_grow2.wav']);

    this.load.spritesheet('chunks', 'assets/chunks.png', { frameWidth: 8, frameHeight: 8});
  }

  create() {
    setTimeout(function(){
      this.scene.start('Game');
    }.bind(this), 1000);
  }
}
