/* globals __DEV__ */
import Phaser from 'phaser'
import Miner from '../sprites/Miner'
import Squirrel from '../sprites/Squirrel'
import Blood from '../sprites/Blood'
import MineEntrance from '../sprites/MineEntrance'
import LevelLoader from '../LevelLoader'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.miner = new Miner(game, 0,0);

    this.loader = new LevelLoader(game);
    this.loader.onLayerLoaded.add(() => {
      this.miner.position.set(this.loader.playerStart.x, this.loader.playerStart.y)
    })
    this.map = this.loader.loadMap('cave')
    this.loader.loadLayer('Overworld', true);
    this.game.add.existing(this.miner);

    this.layerGroup = this.loader.layerObjects['Overworld'];
    // group(parent, name, addToStage, enableBody, physicsBodyType);
    this.squirrels = this.game.add.group(this.game.world, 'squirrels', false, true, Phaser.Physics.ARCADE);
    this.layerGroup.add(this.squirrels);

    // TODO: do I have to?
    //this.squirrels.addChild(this.miner);

    this.squirrelCount = 100;
    for(var i=0; i < this.squirrelCount; i++) {
      this.squirrels.add(Squirrel.createAtRandom(this.game));
    }

    this.game.camera.follow(this.miner);
    this.setupSquirrelCounter();
  }

  doCollision(a, b) {
    b.collideWith(a);
  }

  squirrelKill(miner, squirrel) {
    var killed = false;
    if(miner.action=='attack' && miner.axIsInKillPosition()) {
      if(miner.scale.x >= 0) {
        // facing right
        if(squirrel.position.x >= miner.position.x) {
          //squirrel is to the right
          var delta = squirrel.position.x - miner.position.x;
          if(delta < 90 && delta > 50) {
            killed = true;
          }
        }
      } else {
        // facing left
        if(miner.scale.x < 0) {
          if(squirrel.position.x <= miner.position.x) {
            //squirrel is to the left
            var delta = miner.position.x - squirrel.position.x;
            if(delta < 90 && delta > 50) {
              killed = true;
            }
          }
        }
      }

      if(killed) {
        squirrel.onHit(this.squirrels);
        --this.squirrelCount;
      }
    }
  }

  update() {
    var speed = 200;

    this.game.physics.arcade.collide(this.miner, this.loader.collidables, this.doCollision, null, this);
    this.game.physics.arcade.collide(this.miner, this.layer);

    this.game.physics.arcade.overlap(this.miner, this.squirrels, this.squirrelKill, null, this)

    this.miner.update();

    this.squirrels.forEachAlive(function(s) { s.update(); });
    this.squirrels.sort('y', Phaser.Group.SORT_ASCENDING);
    this.squirrelFont.text = this.squirrelCount.toString();
  }

  render () {
    //this.game.debug.body(this.miner.axHitbox);
    // this.game.debug.body(this.miner);
    // this.squirrels.forEachAlive(function(s){ self.game.debug.body(s); });

    //var self = this;
    // this.game.debug.spriteBounds(this.miner, 'pink', false);
    // this.loader.collidables.forEach( (c) => {
    //   this.game.debug.body(c);
    //   this.game.debug.spriteBounds(c, 'pink', false);
    // } )

    //this.game.debug.body(this.mine);
    //this.game.debug.body(this.axHitbox);
    //this.layer.debug = true;
  }

  setupSquirrelCounter() {
    //retroFont(font, characterWidth, characterHeight, chars, charsPerRow [, xSpacing] [, ySpacing] [, xOffset] [, yOffset])
    this.squirrelFont = this.game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);

    var squirrelCountContainer = this.game.add.image(this.game.width-200, this.game.height-50, this.squirrelFont);
    squirrelCountContainer.tint = 0xFFF000;
    squirrelCountContainer.anchor.set(0.5, 1);
    squirrelCountContainer.scale.set(2,2);
    squirrelCountContainer.fixedToCamera = true;
  }
}
