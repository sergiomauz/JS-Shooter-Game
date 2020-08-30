import { Scene } from 'phaser';

export default class GameScene extends Scene {
  preload() {
    this.load.image('logos', 'assets/logo.png');
  }

  create() {
    this.add.image(400, 300, 'logos');
  }
}