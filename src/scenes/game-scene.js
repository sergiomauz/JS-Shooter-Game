/* eslint-disable class-methods-use-this */
import { Scene, Input, Math } from 'phaser';
import Asteroid from '../components/asteroid';
import BattleCruiser from '../components/battlecruiser';
import Explosion from '../components/explosion';
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

  hitEnemy(projectile, enemy) {
    this.newExplosion = new Explosion(this, enemy.x, enemy.y);
    projectile.destroy();
    enemy.reset();

    /*
    this.score += 15;
    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = `SCORE ${scoreFormated}`;
    */
  }

  hurtPlayer(currentPlayer, enemy) {
    enemy.reset();
    if (this.battlecruiser.alpha < 1) {
      return;
    }

    this.newExplosion = new Explosion(this, currentPlayer.x, currentPlayer.y);
    currentPlayer.disableBody(true, true);
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  }

  resetPlayer() {
    const x = CONFIG.width / 2;
    const y = CONFIG.height;
    this.battlecruiser.enableBody(true, x, y, true, true);

    this.battlecruiser.alpha = 0.5;
    this.tweens.add({
      targets: this.battlecruiser,
      y: CONFIG.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete() {
        this.battlecruiser.alpha = 1;
      },
      callbackScope: this,
    });
  }

  addEvents() {
    this.physics.world.setBoundsCollision();

    // this.physics.add.overlap(this.battlecruiser, this.asteroids, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.battlecruiser, this.asteroids, this.battlecruiser.hurt, null, this);
    // this.physics.add.overlap(this.projectiles, this.asteroids, this.hitEnemy, null, this);
    this.physics.add.overlap(this.projectiles, this.asteroids, this.projectiles.hit, null, this);
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