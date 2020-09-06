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

  printScoreBoard(isTop10) {
    let congratulations = '';
    if (isTop10) {
      congratulations = '\n\nContratulations!\nYou are in\nthe Top 10 pilots';
    }
    const gameOverMessage = `${this.playerName}, YOUR SCORE: ${this.playerScore}${congratulations}`;
    this.scoreLabel = this.add.text(0, 0, gameOverMessage, { fontSize: '32px', fill: '#2BF607', align: 'center' });

    Display.Align.In.Center(
      this.scoreLabel,
      this.zone,
    );
  }

  init(data) {
    this.leaderboard = new Leaderboard();

    this.playerName = data.playerName;
    this.playerScore = data.playerScore;
  }

  preload() {
    this.zone = this.add.zone(
      CONFIG.width / 2,
      CONFIG.height / 2,
      CONFIG.width,
      CONFIG.height,
    );
  }

  async create() {
    this.addBackground();
    this.add.image(400, 100, ASSETS_KEYS.GAME_OVER);

    const top10 = await this.leaderboard.getScoreAsync();
    let isTop10 = false;
    if (top10.code > 0) {
      if (top10.data.length < 10) {
        this.newScore = await this.leaderboard.saveScore(this.playerName, this.playerScore);
        isTop10 = true;
      } else if (this.playerScore > top10.data[9].score) {
        this.newScore = await this.leaderboard.saveScore(this.playerName, this.playerScore);
        isTop10 = true;
      }
    }

    this.printScoreBoard(isTop10);

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