/* eslint-disable class-methods-use-this */
import { Scene } from 'phaser';
import CONFIG from '../config';
import ASSETS_KEYS from '../keys/assets-keys';

export default class GameOver extends Scene {
  addBackground() {
    this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, `${ASSETS_KEYS.SPACE_BACKGROUND}`);
    this.background.setOrigin(0, 0);
  }

  create() {
    this.addBackground();
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}