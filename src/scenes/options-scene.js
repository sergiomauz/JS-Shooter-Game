import { Scene, Display } from 'phaser';
import CONFIG from '../config';
import SCENE_KEYS from '../keys/scene';
import ASSETS_KEYS from '../keys/assets';

export default class OptionsScene extends Scene {
  addBackground() {
    this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, `${ASSETS_KEYS.SPACE_BACKGROUND}`);
    this.background.setOrigin(0, 0);
  }

  updateAudio() {
    if (this.musicOn === false) {
      this.musicButton.setTexture(ASSETS_KEYS.UNCHECKED_BOX);
    } else {
      this.musicButton.setTexture(ASSETS_KEYS.CHECKED_BOX);
    }

    if (this.soundOn === false) {
      this.soundButton.setTexture(ASSETS_KEYS.UNCHECKED_BOX);
    } else {
      this.soundButton.setTexture(ASSETS_KEYS.CHECKED_BOX);
    }
  }

  create() {
    this.addBackground();

    this.musicOn = true;
    this.soundOn = true;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40, fill: '#2BF607', fontWeight: 'bold' });

    this.musicButton = this.add.image(200, 200, ASSETS_KEYS.CHECKED_BOX);
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24, fill: '#2BF607', fontWeight: 'bold' });

    this.soundButton = this.add.image(200, 300, ASSETS_KEYS.CHECKED_BOX);
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

    this.menuButton = this.add.sprite(400, 500, ASSETS_KEYS.BUTTON).setInteractive();
    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#2BF607' });
    Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.TITLE);
    });

    this.menuButton.on('pointerover', () => {
      this.menuButton.setTexture(ASSETS_KEYS.BUTTON_ON_HOVER);
    });

    this.menuButton.on('pointerout', () => {
      this.menuButton.setTexture(ASSETS_KEYS.BUTTON);
    });

    this.updateAudio();
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}