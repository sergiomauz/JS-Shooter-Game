import { Scene } from 'phaser';
import SCENE_KEYS from '../components/scene-keys';
import ASSETS_KEYS from '../components/assets-keys';
import PixelFontImage from '../assets/fonts/pixelFont.png';
import PixelFontXML from '../assets/fonts/pixelFont.xml';

export default class PreloaderScene extends Scene {
  loadAssets() {
    this.load.spritesheet(ASSETS_KEYS.LOGO, 'assets/logo.png', {
      frameWidth: 400,
      frameHeight: 300,
    });
    this.load.spritesheet(ASSETS_KEYS.SPACE_BACKGROUND, 'assets/space_background.png', {
      frameWidth: 800,
      frameHeight: 600,
    });

    this.load.spritesheet(ASSETS_KEYS.SHIP, 'assets/sprites/ship.png', {
      frameWidth: 78,
      frameHeight: 70,
    });
    this.load.spritesheet(ASSETS_KEYS.BULLET, 'assets/sprites/bullet.png', {
      frameWidth: 8,
      frameHeight: 100,
    });

    this.load.spritesheet(ASSETS_KEYS.BUTTON, 'assets/ui/red_button01.png', {
      frameWidth: 190,
      frameHeight: 45,
    });
    this.load.spritesheet(ASSETS_KEYS.BUTTON_ON_HOVER, 'assets/ui/red_button02.png', {
      frameWidth: 190,
      frameHeight: 49,
    });
    this.load.spritesheet(ASSETS_KEYS.UNCHECKED_BOX, 'assets/ui/red_box_unchecked.png', {
      frameWidth: 38,
      frameHeight: 36,
    });
    this.load.spritesheet(ASSETS_KEYS.CHECKED_BOX, 'assets/ui/red_box_checked.png', {
      frameWidth: 38,
      frameHeight: 36,
    });
    ['01', '02', '03', '04', '05'].forEach((asteroid) => {
      this.load.spritesheet(ASSETS_KEYS.ASTEROID.concat(asteroid), `assets/sprites/asteroids/${asteroid}.png`, {
        frameWidth: 60,
        frameHeight: 60,
      });
    });
    this.load.spritesheet(ASSETS_KEYS.EXPLOSION, 'assets/sprites/asteroids/explosion.png', {
      frameWidth: 120,
      frameHeight: 120,
    });

    this.load.bitmapFont(ASSETS_KEYS.PIXEL_FONT, PixelFontImage, PixelFontXML);

    this.load.audio(ASSETS_KEYS.BG_MUSIC, ['assets/music.mod']);
  }

  addProgressBar() {
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
  }

  preload() {
    this.addProgressBar();
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
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