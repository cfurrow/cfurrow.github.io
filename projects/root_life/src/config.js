import Phaser from 'phaser';

export default {
  type: Phaser.WEBGL,
  width: 64,
  height: 64,
  zoom: 8,
  resolution: 5,
  physics: {
    default: 'arcade'
  },
  pixelArt: true,
  parent: 'root-life',
  localStorageName: 'root-life'
};
