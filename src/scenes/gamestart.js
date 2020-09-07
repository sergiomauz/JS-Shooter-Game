/* eslint-disable class-methods-use-this */
import { Scene, Input, Math } from 'phaser';
import Asteroid from '../components/asteroid';
import BattleCruiser from '../components/battlecruiser';
import General from '../helpers/general';
import { ASSETS_CONSTANTS, SCENE_CONSTANTS, GAME_CONFIG } from '../helpers/constants';

export default class GameScene extends Scene {
  displayScoreBoard() {
    const { score } = this.battlecruiser.player;
    const scoreFormated = General.zeroPad(score, 6);

    this.scoreLabel.text = `SCORE ${scoreFormated}`;
  }

  addBattleCruiser() {
    this.battlecruiser = new BattleCruiser(this,
      this.playerName,
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height - 40);

    this.lives = this.add.tileSprite(
      GAME_CONFIG.width - 75,
      5,
      66,
      55,
      `${ASSETS_CONSTANTS.LIFE}03`,
    );
    this.lives.setOrigin(0, 0);
    this.pilot = this.add.tileSprite(
      GAME_CONFIG.width - 135,
      5,
      55,
      54,
      `${ASSETS_CONSTANTS.PILOT}`,
    );
    this.pilot.setOrigin(0, 0);

    this.projectiles = this.add.group();
  }

  addAsteroid(type, speed) {
    this[`${ASSETS_CONSTANTS.ASTEROID}${type}`] = new Asteroid(type,
      speed,
      this,
      Math.Between(0, GAME_CONFIG.width),
      0);

    this.asteroids.add(this[`${ASSETS_CONSTANTS.ASTEROID}${type}`]);
  }

  addEvents() {
    this.physics.world.setBoundsCollision();

    this.physics.add.overlap(this.battlecruiser,
      this.asteroids,
      this.battlecruiser.hurt,
      null,
      this.battlecruiser);

    this.physics.add.overlap(this.projectiles,
      this.asteroids,
      this.battlecruiser.hitEnemy,
      null,
      this.battlecruiser);
  }

  init(data) {
    if (data.playerName.trim().length > 0) {
      this.playerName = data.playerName;
    } else {
      this.playerName = 'UNNAMED';
    }
  }

  preload() {
    this.asteroidTypes = ['01', '02', '03', '04', '05'];
    this.remainingLiveTypes = ['01', '02', '03'];
    this.asteroids = this.physics.add.group();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
  }

  create() {
    General.addBackground(this);

    this.asteroidTypes.forEach((type, index) => {
      this.addAsteroid(type, index + 1);
    });

    this.addBattleCruiser();

    this.playerNameLabel = this.add.text(10, 5, this.playerName, { fontSize: '32px', fill: '#2BF607' });
    this.scoreLabel = this.add.text(10, 30, '', { fontSize: '32px', fill: '#2BF607' });

    this.addEvents();
  }

  update() {
    if (this.battlecruiser.player.lives <= 0) {
      this.scene.start(SCENE_CONSTANTS.GAME_OVER,
        {
          playerName: this.playerName,
          playerScore: this.battlecruiser.player.score,
        });
    }

    this.background.tilePositionY -= 0.5;

    this.asteroidTypes.forEach((type) => {
      this[`${ASSETS_CONSTANTS.ASTEROID}${type}`].move();
    });

    this.battlecruiser.move(this.cursorKeys);
    this.battlecruiser.shoot(this.spacebar);

    this.displayScoreBoard();

    (this.projectiles.getChildren() || []).forEach((beam) => {
      beam.update();
    });
  }
}