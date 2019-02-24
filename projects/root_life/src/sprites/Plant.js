"use strict";
import Phaser from 'phaser';

export default class extends Phaser.GameObjects.Group {
  static get STEM_FRAME() {
    return 0;
  }

  static get LEAF_FRAMES() {
    return [1,2,3,4];
  }

  get top() {
    return { x: this.stemDetails.x, y: this.stemDetails.y };
  }

  constructor(config) {
    super(config.scene);

    this.rnd   = config.rnd;
    this.head  = null;
    this.scene.add.existing(this);
    this.active = false;

    this.stemDetails = { lastScore: 0, x: 0, y: 0};
    this.leafDetails = { lastScore: 0, lastDir: -1 };
    this.leaves = [];

    this._events = new Phaser.Events.EventEmitter();
  }

  on(eventName, handler, context) {
    this._events.on(eventName, handler, context);
  }

  grow(x, y) {
    this.active = true;
    this.stemDetails.x = x;
    this.stemDetails.y = y - 2;
    this.y = y;
    this.x = x;
  }

  growStem(times = 1) {
    let x = null;
    let y = null;
    for(let i = 0; i < times; i++) {
      this.stemDetails.y -= 2;
      let newStem = this.create(this.x, this.stemDetails.y, 'plant', this.constructor.STEM_FRAME);
      x = newStem.x;
      y = newStem.y;
    }
    if(x !== null && y !== null) {
      this._events.emit('growing', x, y);
    }
  }

  addLeaf() {
    let x = this.stemDetails.x;
    let y = this.stemDetails.y;
    // pick left or right;
    this.leafDetails.lastDir *= -1;
    let newLeaf = this.create(x, y, 'plant', this.constructor.LEAF_FRAMES[0]);
    newLeaf.setOrigin(0.5, 1);
    newLeaf.angle = 90;

    if(this.leafDetails.lastDir <= 0) {
      newLeaf.angle = -90;
      newLeaf.flipX = true;
    }
    this.leaves.push(newLeaf);
  }

  update(config) {
    let score = config.score;
    this.updateGrowth(score);
    this.updateLeaves(score);
  }

  updateGrowth(score) {
    let scoreDelta = score - this.stemDetails.lastScore;
    let growDelta = 10;
    let growth = Math.floor(scoreDelta / growDelta);
    if(growth > 0) {
      this.growStem(growth);
      this.stemDetails.lastScore = score;
    }
  }

  updateLeaves(score) {
    let scoreDelta = score - this.leafDetails.lastScore;
    let growDelta = 50;
    let growth = Math.floor(scoreDelta / growDelta);
    if(growth > 0) {
      this.addLeaf();
      this.leafDetails.lastScore = score;
    }
  }
}
