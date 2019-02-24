import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Miner from '../sprites/Miner'
import Squirrel from '../sprites/Squirrel'
import MineEntrance from '../sprites/MineEntrance'

export default class extends Phaser.State {
  init () {}

  preload () {
    // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    // centerGameObjects([this.loaderBg, this.loaderBar])

    // this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    Miner.preload(this.game);
    Squirrel.preload(this.game);
    MineEntrance.preload(this.game);

    this.game.load.spritesheet('blood', 'assets/blood.png', 32, 32, -1, 32, 32);
    this.game.load.image('knightHawks', 'assets/KNIGHT3.png');

    this.game.load.image('confusion', 'assets/infusionsoft.png', 300, 300);

    this.game.load.tilemap('cave', 'assets/levels/cave.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('cave', 'assets/levels/cave.png');
    // this.game.load.image('grass', 'assets/levels/grass.png');
    // this.game.load.image('grass2', 'assets/levels/grass2.png');
  }

  create () {
    this.state.start('Game')
  }
}
