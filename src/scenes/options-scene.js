import { Scene, Display } from 'phaser';
import SCENE_KEYS from '../components/scene-keys';

export default class OptionsScene extends Scene {
  updateAudio() {
    if (this.musicOn === false) {
      this.musicButton.setTexture('box');
    } else {
      this.musicButton.setTexture('checkedBox');
    }

    if (this.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }

  create() {
    this.musicOn = true;
    this.soundOn = true;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40, fill: '#2BF607', fontWeight: 'bold' });

    this.musicButton = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24, fill: '#2BF607', fontWeight: 'bold' });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24, fill: '#2BF607', fontWeight: 'bold' });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.musicOn = !this.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.soundOn = !this.soundOn;
      this.updateAudio();
    });

    this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#2BF607' });
    Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.TITLE);
    });

    this.menuButton.on('pointerover', () => {
      this.menuButton.setTexture('blueButton2');
    });

    this.menuButton.on('pointerout', () => {
      this.menuButton.setTexture('blueButton1');
    });

    this.updateAudio();
  }
}