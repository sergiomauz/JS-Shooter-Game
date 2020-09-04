/* eslint-disable class-methods-use-this */
import { Scene, Input, Math } from 'phaser';
import Bullet from '../classes/bullet';
import Asteroid from '../classes/asteroid';
import Explosion from '../classes/explosion';
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

  destroyObject(gameObject) {
    gameObject.setTexture(ASSETS_KEYS.EXPLOSION);
    gameObject.play(`${ASSETS_KEYS.EXPLOSION}_anim`);
  }

  addAsteroid(asteroid) {
    const asteroidSprite = this.add.sprite(
      Math.Between(0, CONFIG.width),
      0,
      asteroid.type(),
    );

    this.enemies.add(asteroidSprite);

    asteroidSprite.setInteractive();

    return asteroidSprite;
  }

  addShip() {
    this.player = this.physics.add.sprite(
      CONFIG.width / 2,
      CONFIG.height - 40,
      ASSETS_KEYS.SHIP,
    );

    this.player.setCollideWorldBounds(true);

    this.projectiles = this.add.group();
  }

  resetShipPosition(shipMoved) {
    shipMoved.y = 0;
    shipMoved.x = Math.Between(25, CONFIG.width - 25);
  }

  moveShip() {
    this.player.setVelocity(0);

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-600);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(600);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-600);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(600);
    }
  }

  shootBullet() {
    if (Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.newBullet = new Bullet(this);
      }
    }
  }


  moveAsteroid(shipMoved, speedMovement) {
    shipMoved.y += speedMovement;
    if (shipMoved.y > CONFIG.height) {
      this.resetShipPosition(shipMoved);
    }
  }

  hitEnemy(projectile, enemy) {
    this.newExplosion = new Explosion(this, enemy.x, enemy.y);
    projectile.destroy();
    this.resetShipPosition(enemy);

    this.score += 15;
    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = `SCORE ${scoreFormated}`;
  }

  hurtPlayer(currentPlayer, enemy) {
    this.resetShipPosition(enemy);

    if (this.player.alpha < 1) {
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
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;
    this.tweens.add({
      targets: this.player,
      y: CONFIG.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete() {
        this.player.alpha = 1;
      },
      callbackScope: this,
    });
  }

  addScoreBoard() {
    this.score = 0;

    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, ASSETS_KEYS.PIXEL_FONT, `SCORE ${scoreFormated}`, 16);
  }

  addEnemies() {
    this.asteroidTypes = ['01', '02', '03', '04', '05'];

    this.enemies = this.physics.add.group();
    this.asteroidTypes.forEach((type) => {
      const asteroid = new Asteroid(type);
      this[asteroid.type()] = this.addAsteroid(asteroid);
    });
  }

  addEvents() {
    this.input.on('gameobjectdown', this.destroyObject, this);

    this.physics.world.setBoundsCollision();

    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
  }

  create() {
    this.addBackground();
    this.addEnemies();
    this.addShip();

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);

    this.anims.create({
      key: `${ASSETS_KEYS.EXPLOSION}_anim`,
      frames: this.anims.generateFrameNumbers(ASSETS_KEYS.EXPLOSION),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: `${ASSETS_KEYS.BULLET}_anim`,
      frames: this.anims.generateFrameNumbers(ASSETS_KEYS.BULLET),
      frameRate: 20,
      repeat: -1,
    });

    this.addScoreBoard();

    this.addEvents();
  }

  update() {
    this.background.tilePositionY -= 0.5;

    this.asteroidTypes.forEach((type, index) => {
      this.moveAsteroid(this[`${ASSETS_KEYS.ASTEROID}${type}`], index + 1);
    });

    this.moveShip();
    this.shootBullet();

    (this.projectiles.getChildren() || []).forEach((bullet) => {
      bullet.update();
    });
  }
}