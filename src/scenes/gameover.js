/* eslint-disable class-methods-use-this */
import { Scene, Display } from 'phaser';
import Leaderboard from '../classes/leaderboard';
import General from '../helpers/general';
import { ASSETS_CONSTANTS, SCENE_CONSTANTS, GAME_CONFIG } from '../helpers/constants';

export default class GameOver extends Scene {
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
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2,
      GAME_CONFIG.width,
      GAME_CONFIG.height,
    );
  }

  async create() {
    General.addBackground(this);

    this.add.image(400, 100, ASSETS_CONSTANTS.GAME_OVER);

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

    this.gameButton = this.add.sprite(300, 200, ASSETS_CONSTANTS.BUTTON).setInteractive();
    Display.Align.In.Center(
      this.gameButton,
      this.add.zone(
        GAME_CONFIG.width / 2,
        GAME_CONFIG.height - 80,
        GAME_CONFIG.width,
        GAME_CONFIG.height,
      ),
    );

    this.gameText = this.add.text(0, 0, 'Reset', { fontSize: '32px', fill: '#2BF607' });
    Display.Align.In.Center(
      this.gameText,
      this.gameButton,
    );

    this.gameButton.on('pointerdown', () => {
      this.scene.start(SCENE_CONSTANTS.TITLE);
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_CONSTANTS.BUTTON_ON_HOVER);
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_CONSTANTS.BUTTON);
    });
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}