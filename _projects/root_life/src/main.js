import Phaser from 'phaser';

import BootScene from './scenes/Boot';
import SplashScene from './scenes/Splash';
import GameScene from './scenes/Game';

import config from './config';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    
    this.scene.add('Boot', BootScene, false);
    this.scene.add('Splash', SplashScene, false);
    this.scene.add('Game', GameScene, false);

    this.scene.start('Boot');
  }
}

window.game = new Game();
