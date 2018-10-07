import Phaser from 'phaser';

import BootScene from './scenes/Boot';
import SplashScene from './scenes/Splash';
import GameScene from './scenes/Game';

import config from './config';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: config.width,
      height: config.height,
      zoom: config.zoom,
      resolution: config.resolution,
      physics: {
        default: 'arcade',
        // arcade: {
        //   debug: true
        // }
      },
      pixelArt: true,
      parent: 'root-life'
    });

    this.scene.add('Boot', BootScene, false);
    this.scene.add('Splash', SplashScene, false);
    this.scene.add('Game', GameScene, false);

    this.scene.start('Boot');
  }
}

window.game = new Game();
