/* eslint-disable class-methods-use-this */
import { Scene, Display } from 'phaser';
import Leaderboard from '../classes/leaderboard';
import General from '../helpers/general';
import { ASSETS_CONSTANTS, SCENE_CONSTANTS, GAME_CONFIG } from '../helpers/constants';

export default class Top10Scene extends Scene {
  printLeaderboard(top10) {
    let strTop10 = '';
    top10.forEach((item, index) => {
      strTop10 += `\n${index + 1}\t\t${General.zeroPad(item.score, 6)}\t\t${item.user}`;
    });

    this.scoreLabel = this.add.text(400, 300, strTop10, { fontSize: '32px', fill: '#2BF607' });
    this.scoreLabel.setOrigin(0.5, 0.5);
  }

  async create() {
    General.addBackground(this);

    this.add.image(400, 100, ASSETS_CONSTANTS.TOP_TEN);

    this.menuButton = this.add.sprite(GAME_CONFIG.width / 2,
      GAME_CONFIG.height - 75,
      ASSETS_CONSTANTS.BUTTON).setInteractive();

    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#2BF607' });
    Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start(SCENE_CONSTANTS.TITLE);
    });

    this.menuButton.on('pointerover', () => {
      this.menuButton.setTexture(ASSETS_CONSTANTS.BUTTON_ON_HOVER);
    });

    this.menuButton.on('pointerout', () => {
      this.menuButton.setTexture(ASSETS_CONSTANTS.BUTTON);
    });

    this.leaderboard = new Leaderboard();
    const top10 = await this.leaderboard.getScoreAsync();
    this.printLeaderboard(top10.data || []);
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}