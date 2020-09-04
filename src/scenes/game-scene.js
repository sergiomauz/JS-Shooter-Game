/* eslint-disable class-methods-use-this */
import { Scene, Input, Math } from 'phaser';
import Asteroid from '../components/asteroid';
import BattleCruiser from '../components/battlecruiser';
import CONFIG from '../config';
import ASSETS_KEYS from '../keys/assets-keys';

export default class GameScene extends Scene {
  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = '0'.concat(stringNumber);
    }
    return stringNumber;
  }

  addScoreBoard() {
    this.score = 0;

    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, ASSETS_KEYS.PIXEL_FONT, `SCORE ${scoreFormated}`, 16);
  }

  addBackground() {
    this.background = this.add.tileSprite(
      0,
      0,
      CONFIG.width,
      CONFIG.height,
      ASSETS_KEYS.SPACE_BACKGROUND,
    );
    this.background.setOrigin(0, 0);
  }

  addBattleCruiser() {
    this.battlecruiser = new BattleCruiser(this,
      CONFIG.width / 2,
      CONFIG.height - 40);

    this.projectiles = this.add.group();
  }

  addAsteroid(type) {
    this[`${ASSETS_KEYS.ASTEROID}${type}`] = new Asteroid(type,
      this,
      Math.Between(0, CONFIG.width),
      0);

    this.asteroids.add(this[`${ASSETS_KEYS.ASTEROID}${type}`]);
  }

  addEvents() {
    this.physics.world.setBoundsCollision();

    this.physics.add.overlap(this.battlecruiser,
      this.asteroids,
      this.battlecruiser.hurt,
      null,
      this);

    this.physics.add.overlap(this.projectiles,
      this.asteroids,
      this.battlecruiser.hitEnemy,
      null,
      this.battlecruiser);
  }

  preload() {
    this.asteroidTypes = ['01', '02', '03', '04', '05'];
    this.asteroids = this.physics.add.group();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
  }

  create() {
    this.addBackground();

    this.asteroidTypes.forEach((type) => {
      this.addAsteroid(type);
    });

    this.addBattleCruiser();

    this.addScoreBoard();

    this.addEvents();
  }

  update() {
    this.background.tilePositionY -= 0.5;

    this.asteroidTypes.forEach((type, index) => {
      this[`${ASSETS_KEYS.ASTEROID}${type}`].move(index + 1);
    });

    this.battlecruiser.move(this.cursorKeys);
    this.battlecruiser.shoot(this.spacebar);

    (this.projectiles.getChildren() || []).forEach((beam) => {
      beam.update();
    });
  }
}