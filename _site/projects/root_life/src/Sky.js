import Phaser from 'phaser';

export default class {

  get dayColor() {
    return Phaser.Display.Color.HexStringToColor('#ffffff');
  }

  get sunsetColor() {
    return Phaser.Display.Color.HexStringToColor('#b58d5a');
  }

  get sunriseColor() {
    return Phaser.Display.Color.HexStringToColor('#e4d6c3');
  }

  get nightColor() {
    return Phaser.Display.Color.HexStringToColor('#0e3244');
  }

  get dayTime() {
    return 15000 / this.timeScale;
  }

  get sunsetTime() {
    return 15000 / this.timeScale;
  }

  get nightTime() {
    return 20000 / this.timeScale;
  }

  get sunriseTime() {
    return 15000 / this.timeScale;
  }

  constructor(scene){
    this.scene = scene;
    this.time = 0;
    this.transitioning = false;

    this.tweenIndex = 0;
    this.timeScale = 1;

    this.color = this.dayColor;
    this.skyBG = this.scene.add.tileSprite(-32, -32, 128, 96, 'sky');
    this.skyBG.setOrigin(0,0);

    this.clouds = this.scene.add.tileSprite(32, 32, 64, 64, 'clouds');

    this.tweens = [];

    this.tweens.push(this.scene.add.tween({
      targets: this.sunriseColor,
      red:   this.dayColor.red,
      green: this.dayColor.green,
      blue:  this.dayColor.blue,
      ease: 'Linear',
      duration: this.dayTime,
      paused: true,
      onComplete: () => {
        console.log("Going to sunset...")
        this.tweenIndex = 1;
        this.playCurrentTween();
      }
    }));

    this.tweens.push(this.scene.add.tween({
      targets: this.dayColor,
      red:   this.sunsetColor.red,
      green: this.sunsetColor.green,
      blue:  this.sunsetColor.blue,
      ease: 'Linear',
      duration: this.sunsetTime,
      paused: true,
      onComplete: () => {
        console.log("Going to night...")
        this.tweenIndex = 2;
        this.playCurrentTween();
      }
    }));

    this.tweens.push(this.scene.add.tween({
      targets: this.sunsetColor,
      red:   this.nightColor.red,
      green: this.nightColor.green,
      blue:  this.nightColor.blue,
      ease: 'Linear',
      duration: this.nightTime,
      paused: true,
      onComplete: () => {
        console.log("Going to sunrise...")
        this.tweenIndex = 3;
        this.playCurrentTween();
      }
    }));

    this.tweens.push(this.scene.add.tween({
      targets: this.nightColor,
      red:   this.sunriseColor.red,
      green: this.sunriseColor.green,
      blue:  this.sunriseColor.blue,
      ease: 'Linear',
      duration: this.sunriseTime,
      paused: true,
      onComplete: () => {
        console.log("Going to day...")
        this.tweenIndex = 0;
        this.playCurrentTween();
      }
    }));
  }

  start() {
    this.playCurrentTween();
  }

  playCurrentTween() {
    this.tweens[this.tweenIndex].restart();
  }

  update() {
    this.tintTheSky();
    this.scrollClouds();
  }

  scrollClouds() {
    this.clouds.tilePositionX -= 0.05;
  }

  tintTheSky() {
    this.currentTween = this.tweens[this.tweenIndex];
    let newColor = {
      r: this.currentTween.data[0].current,
      g: this.currentTween.data[1].current,
      b: this.currentTween.data[2].current
    };

    let newColorInt = Phaser.Display.Color.ObjectToColor(newColor).color;
    newColorInt = 0x00FFFFFF & newColorInt; // Remove alpha channel

    let args = [newColorInt, newColorInt, newColorInt-0x101010, newColorInt-0x101010];
    this.skyBG.setTint.apply(this, args);
    this.clouds.setTint.apply(this, args);
  }
}
