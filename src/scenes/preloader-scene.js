import { Scene } from 'phaser';
import SCENE_KEYS from '../components/scene-keys';
import ASSETS_KEYS from '../components/assets-keys';

export default class PreloaderScene extends Scene {
  loadAssets() {
    this.load.image(ASSETS_KEYS.SHIP, 'assets/sprites/ship.png');
    this.load.image(ASSETS_KEYS.BULLET, 'assets/sprites/bullet.png');
    this.load.image(ASSETS_KEYS.SPACE_BACKGROUND, 'assets/space_background.png');
    this.load.image(ASSETS_KEYS.LOGO, 'assets/logo.png');
    this.load.image(ASSETS_KEYS.BUTTON, 'assets/ui/red_button01.png');
    this.load.image(ASSETS_KEYS.BUTTON_ON_HOVER, 'assets/ui/red_button02.png');
    this.load.image(ASSETS_KEYS.UNCHECKED_BOX, 'assets/ui/red_box.png');
    this.load.image(ASSETS_KEYS.CHECKED_BOX, 'assets/ui/red_box_checked.png');

    this.load.audio('bgMusic', ['assets/music.mod']);
    ['01', '02', '03', '04', '05'].forEach((asteroid) => {
      this.load.spritesheet('asteroid'.concat(asteroid), `assets/sprites/asteroids/${asteroid}.png`, {
        frameWidth: 120,
        frameHeight: 120,
      });
    });
    this.load.spritesheet('explosion', 'assets/sprites/asteroids/explosion.png', {
      frameWidth: 120,
      frameHeight: 120,
    });
  }

  preload() {
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#2BF607',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#2BF607',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#2BF607',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${100 * parseInt(value, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets
    this.loadAssets();
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start(SCENE_KEYS.TITLE);
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start(SCENE_KEYS.TITLE);
    }
  }
}