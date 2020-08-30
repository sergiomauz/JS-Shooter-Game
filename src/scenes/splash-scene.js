import { Scene } from 'phaser';

class SplashScene extends Scene {
  preload() {
    this.load.image('logoz', 'assets/logo.png');
  }

  create() {
    this.add.text(100, 100, 'Space Gunner', { fill: '#0f0' });
    this.add.image(400, 300, 'logoz');
  }
}

export default SplashScene;