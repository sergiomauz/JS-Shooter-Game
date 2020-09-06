/* eslint-disable class-methods-use-this */
import { Scene, Display } from 'phaser';
import Leaderboard from '../classes/leaderboard';
import CONFIG from '../config';
import SCENE_KEYS from '../keys/scene';
import ASSETS_KEYS from '../keys/assets';

export default class Top10Scene extends Scene {
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = `0${stringNumber}`;
    }
    return stringNumber;
  }

  addBackground() {
    this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, `${ASSETS_KEYS.SPACE_BACKGROUND}`);
    this.background.setOrigin(0, 0);
  }

  printLeaderboard(top10) {
    let strTop10 = '';
    top10.forEach((item, index) => {
      strTop10 += `\n${index + 1}\t\t${this.zeroPad(item.score, 6)}\t\t${item.user}`;
    });

    this.scoreLabel = this.add.text(400, 300, strTop10, { fontSize: '32px', fill: '#2BF607' });
    this.scoreLabel.setOrigin(0.5, 0.5);
  }

  async create() {
    this.addBackground();

    this.leaderboard = new Leaderboard();
    const top10 = await this.leaderboard.getScoreAsync();
    this.printLeaderboard(top10.data || []);

    this.add.image(400, 100, ASSETS_KEYS.TOP_TEN);

    this.menuButton = this.add.sprite(CONFIG.width / 2,
      CONFIG.height - 75,
      ASSETS_KEYS.BUTTON).setInteractive();

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
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}