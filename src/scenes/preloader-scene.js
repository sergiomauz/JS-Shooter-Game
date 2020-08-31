import { Scene } from 'phaser';
import SCENE_KEYS from '../components/scene-keys';

export default class PreloaderScene extends Scene {
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

    // load assets needed
    this.load.image('blueButton1', 'assets/ui/red_button01.png');
    this.load.image('blueButton2', 'assets/ui/red_button02.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/red_box.png');
    this.load.image('checkedBox', 'assets/ui/red_box_checked.png');
    this.load.audio('bgMusic', ['assets/TownTheme.mp3']);
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