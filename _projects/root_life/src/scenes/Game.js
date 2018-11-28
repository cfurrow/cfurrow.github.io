import Phaser from 'phaser';

import Seed from '../sprites/Seed';
import Root from '../sprites/Root';
import Sky from '../Sky';
import Ground from '../Ground';
import Plant from '../sprites/Plant';

import Controller from '../Controller';

export default class extends Phaser.Scene {
  create() {
    this.rnd = Phaser.Math.RND;
    this.controllerLocked = true;
    // NOTE: Not working as expected... cannot seem to add everything. Remove? Make own?
    this.updateList = new Phaser.GameObjects.UpdateList(this);
    this.score = 0;

    if(!this.forestSfx) {
      this.forestSfx = this.sound.add('forest_loop');
      this.forestSfx.play({loop: true, volume: 0.3});
    }

    if(!this.bgm) {
      this.bgm = this.sound.add('bgm');
    }

    this.seedPlop = this.sound.add('seed_plop');
    this.rootGrow = this.sound.add('root_grow');

    //x, y, width, height, key, [frame]
    this.stone = this.add.tileSprite(0, 64, 128, 64, 'stone');
    this.stone.tileScaleX = this.stone.tileScaleY = 0.25;
    this.stone.setOrigin(0,0);

    this.sky = new Sky(this);
    this.sky.start();

    this.logo = this.add.sprite(35, 24, 'logo2');

    this.ground = new Ground(this, 64);
    this.physics.world.setBounds(0, 0, 64, 1064);
    this.cameras.main.setScroll(this.logo.x, this.logo.y);

    // Drop seed. Begin "grow" animation above ground.
    this.seed = new Seed({scene: this, x: 32, y: 4, groundY: this.ground.y, angle: 5});
    this.cameras.main.startFollow(this.seed);
    this.updateList.add(this.seed);

    this.theRoot = new Root({scene: this});
    this.plant   = new Plant({scene: this, rnd: this.rnd});

    this.setupScoreText();

    this.theRoot.on('grow', () =>{
      this.score += 1;
      if(!this.rootGrow.isPlaying) {
        this.rootGrow.play({volume: 0.05});
      }
    });

    this.theRoot.on('waterPickup', () => {
      this.score += 50;
    });

    this.seed.on('planted', this.beginGrow.bind(this));

    this.controller = new Controller({scene: this});
  }

  update(time, delta) {
    this.sky.update(delta);

    if(!this.seed.active && !this.seed.growing) {
      if(this.controller.left.isDown || this.controller.right.isDown) {
        this.seed.active = true;
        this.seed.falling = true;
        this.bgm.setSeek(0);
        this.bgm.play({loop: true, volume: 0.3});
      }

      if(this.controller.left.isDown) {
        this.seed.rotateDirection = -1;
        this.seed.body.setVelocityX(-2);
      } else if(this.controller.right.isDown) {
        this.seed.rotateDirection = 1;
        this.seed.body.setVelocityX(2);
      }
    }

    this.updateList.update(time, delta);
    this.theRoot.update({time: time, delta: delta, controller: this.controller});
    this.plant.update({time: time, delta: delta, score: this.score});

    if(this.theRoot.active) {
      this.stone.tilePositionY += (delta/1000) * this.theRoot.body.velocity.y;
      this.ground.update(time, delta, this.theRoot.body.velocity.y);
    }

    this.scoreText.setText(this.score.toString());
  }

  setupScoreText() {
    this.scoreText = this.add.text(0, 0, '0', { fontFamily: 'Arial', fontSize: 4, color: '#00ff00' });
    this.scoreText.setScrollFactor(0);
  }

  beginGrow() {
    this.cameras.main.stopFollow();
    // Play plop sound
    this.seedPlop.play({volume: 0.3});
    // Begin growing root below ground.
    this.plant.grow(this.seed.x, this.seed.y+4);
    this.theRoot.grow(this.seed.x, this.seed.y+8);

    let onEachPanFrame = (cam,progress,scrollX,scrollY)=>{
      if(progress >= 1.0) {
        //target, [roundPixels], [lerpX], [lerpY], [offsetX], [offsetY]
        this.cameras.main.startFollow(this.theRoot.tail, false, 1, 0.3, 0, 0);
        this.theRoot.enableController();
      }
    };
    //pan(x, y [, duration] [, ease] [, force] [, callback] [, context])
    // We know that the root will be at tail.y + 10, because velocity is 10px per 1000ms
    // The pan animation takes 1000ms, so it will have travelled 10px in that time
    this.cameras.main.pan(this.seed.x, this.theRoot.tail.y + 10, 1000, 'Linear', false, onEachPanFrame);

    // x, y, width, height, makeMain, name
    this.plantCamera = this.cameras.add(0, 0, 16, 16, false, 'plant');
    this.plantCamera.setViewport(48, 0, 16, 16);
    this.plantCamera.setScroll(24, this.seed.y-24);
    this.plantCamera.setZoom(0.2);
    this.plantCamera.ignore(this.logo);
    this.plantCamera.ignore(this.stone);
    this.plantCamera.ignore(this.scoreText);

    this.plant.on('growing', (x,y) =>{
      this.plantCamera.pan(x, y, 1000);
    });

    this.stone.x = -32;
    this.stone.y = 0;
    this.stone.setScrollFactor(0);

    this.physics.add.collider(this.theRoot.tail, this.ground.rocks, this.gameOver.bind(this));
  }

  gameOver() {
    console.log("Game over man!!!!");
    let panTime = 3500;
    let resetTime = 1500;
    // Reset cameras
    this.cameras.remove(this.plantCamera);
    this.cameras.main.stopFollow();
    let resetScene = ()=>{this.scene.restart();};
    // (cam,progress,scrollX,scrollY)
    let delayResetScene = (cam, progress) => {
      if(progress >= 1.0) {
        this.time.addEvent({delay: resetTime, callback: resetScene});
      }
    }

    this.tweens.add({
      targets: this.bgm,
      volume: 0,
      duration: panTime - 100,
      repeat: 0
    });
    //pan(x, y [, duration] [, ease] [, force] [, callback] [, context])
    this.cameras.main.pan(this.plant.top.x, this.plant.top.y, panTime, 'Linear', false, delayResetScene);
  }
}
