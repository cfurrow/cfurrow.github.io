import Phaser from 'phaser';

export default class extends Phaser.Scene {
  preload() {
    this.load.spritesheet('tiny_flower', 'assets/tiny_flower.png', {frameWidth: 16, frameHeight: 16});
  }

  create() {
    this.scene.start('Splash');
  }
}
