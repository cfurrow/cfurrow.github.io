import Phaser from 'phaser';
import Rock from './sprites/Rock';

export default class {
  get y() {
    return this._y;
  }

  get height() {
    return this._height;
  }

  get rocks() {
    return this._rocks;
  }

  constructor(scene, y) {
    this.scene = scene;
    this._y = y;
    this._width = 64;
    this._height = 1000;
    this._chunkHeight = 64;
    this._rocks = [];

    this.group = scene.add.group();

    this.dirt = scene.add.tileSprite(0, y, this._width, this._height, 'dirt');
    this.dirt.setOrigin(0,0);

    // x, y, width, height, key
    this.dirtEdgeLeft = scene.add.tileSprite(0, y, 8, this._height, 'dirt_edge', 0);
    this.dirtEdgeLeft.setOrigin(0.5, 0);

    // x, y, width, height, key
    this.dirtEdgeRight = scene.add.tileSprite(64, y, 8, this._height, 'dirt_edge', 1);
    this.dirtEdgeRight.setOrigin(0.5, 0);

    this.group.add(this.dirt);
    this.group.add(this.dirtEdgeLeft);
    this.group.add(this.dirtEdgeRight);

    // Create obstacles in ground
    // For each 64px "block" or "chunk", we want 1-2 blocks

    let chunkCount = this._height / this._chunkHeight;
    let chunkIndex = 0;
    let chunks = [];
    let currentChunk = null;
    let minY = this._y + 32;
    let maxY = 0;
    let currentY = this._y;
    let pX, pY;
    let rnd = Phaser.Math.RND;
    let rockWidth = 8;
    let rockHeight = 8;
    let frame = 0;
    let rocksPerChunk = 4;
    let rocksToInsert = 0;
    let minX = rockWidth/2;
    let maxX = this._width - rockWidth/2;

    for(; chunkIndex < chunkCount; chunkIndex++) {
      currentY = minY + (chunkIndex * this._chunkHeight);
      currentChunk = [];
      // Pick a layout
      let layout = rnd.between(0,5);
      // layout is an 8x8 sprite
      // if pixel is white/transp, no rock
      // if pixel is black (non transparent), rock.
      for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
          let color = this.scene.textures.getPixel(i, j, 'chunks', layout);
          if(color.alpha == 255) {
            let pX = i * rockWidth;
            let pY = currentY + (j * rockHeight);
            let frame = rnd.pick([0,1,1,1,1,0,0,1,0,0]);

            pX = Phaser.Math.Clamp(pX, minX, maxX);

            let rock = new Rock({x: pX, y: pY, frame: frame, scene: this.scene});
            currentChunk.push(rock);
            this._rocks.push(rock);
          }
        }
      }
      chunks.push(currentChunk);
    }
  }

  update(time, delta, velocityY) {
  }
}
