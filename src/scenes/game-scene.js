import { Scene } from 'phaser';

export default class GameScene extends Scene {
  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.add.image(400, 175, 'logo');
  }
}