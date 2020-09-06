/* eslint-disable class-methods-use-this */
import { Scene, Display } from 'phaser';
import Leaderboard from '../classes/leaderboard';
import CONFIG from '../config';
import SCENE_KEYS from '../keys/scene';
import ASSETS_KEYS from '../keys/assets';

export default class GameOver extends Scene {
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

    this.add.image(400, 100, ASSETS_KEYS.GAME_OVER);

    this.newScore = await this.leaderboard.saveScore(this.playerName, this.playerScore);
    this.top10 = await this.leaderboard.getScoreAsync();

    this.printLeaderboard();

    this.gameButton = this.add.sprite(300, 200, ASSETS_KEYS.BUTTON).setInteractive();
    Display.Align.In.Center(
      this.gameButton,
      this.add.zone(
        CONFIG.width / 2,
        CONFIG.height - 80,
        CONFIG.width,
        CONFIG.height,
      ),
    );

    this.gameText = this.add.text(0, 0, 'Reset', { fontSize: '32px', fill: '#2BF607' });
    Display.Align.In.Center(
      this.gameText,
      this.gameButton,
    );

    this.gameButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.TITLE);
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_KEYS.BUTTON_ON_HOVER);
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_KEYS.BUTTON);
    });
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}