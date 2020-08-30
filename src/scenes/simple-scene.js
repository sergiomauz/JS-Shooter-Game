import { Scene } from 'phaser';

class SimpleScene extends Scene {
  preload() {
    this.load.image('ship', 'assets/ship.png');
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.add.image(100, 200, 'ship');
  }
}

export default SimpleScene;