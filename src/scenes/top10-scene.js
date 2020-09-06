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

  printLeaderboard() {
    if (this.top10.code > 0) {
      let strTop10 = '';
      this.top10.data.forEach((item, index) => {
        strTop10 += `\n${index + 1}\t\t${this.zeroPad(item.score, 6)}\t\t${item.user}`;
      });

      this.scoreLabel = this.add.text(400, 300, strTop10, { fontSize: '32px', fill: '#2BF607' });
      this.scoreLabel.setOrigin(0.5, 0.5);
    }
  }

  init(data) {
    this.leaderboard = new Leaderboard();

    this.playerName = data.playerName;
    this.playerScore = data.playerScore;
  }

  async create() {
    this.addBackground();


    this.newScore = await this.leaderboard.saveScore(this.playerName, this.playerScore);
    this.top10 = await this.leaderboard.getScoreAsync();
    this.printLeaderboard();

    this.menuButton = this.add.sprite(400, 500, ASSETS_KEYS.BUTTON).setInteractive();
    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#2BF607' });
    Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.TITLE);
    });
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}