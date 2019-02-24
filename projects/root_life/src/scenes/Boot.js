import Phaser from 'phaser';

export default class extends Phaser.Scene {
  preload() {
    this.load.spritesheet('tiny_flower', 'assets/tiny_flower.png', {frameWidth: 16, frameHeight: 16});
  }

  create() {
    let config = this.game.config;
    let viewWidth = window.innerWidth;
    let viewHeight = window.innerHeight;
    let factor = 1;
    if(viewHeight > viewWidth) {
      factor = viewWidth / config.width;
    } else {
      factor = viewHeight / config.height;
    }


    this.game.canvas.style.width = config.width * factor + "px";
    this.game.canvas.style.height = config.height * factor + "px";

    this.scene.start('Splash');
  }
}
