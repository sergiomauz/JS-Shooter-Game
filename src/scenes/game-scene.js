/* eslint-disable class-methods-use-this */
import { Scene, Input, Math } from 'phaser';
import BulletGroup from '../classes/bullet-group';
import Asteroid from '../classes/asteroid';
import CONFIG from '../components/config';
import ASSETS_KEYS from '../components/assets-keys';

export default class GameScene extends Scene {
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

  destroyAsteroid(pointer, gameObject) {
    gameObject.setTexture(ASSETS_KEYS.EXPLOSION);
    gameObject.play('explosion_anim');
  }

  addAsteroid(asteroid) {
    const asteroidSprite = this.add.sprite(
      Math.Between(0, CONFIG.width),
      0,
      asteroid.type(),
    );

    this.anims.create({
      key: `${asteroid.type()}_anim`,
      frames: this.anims.generateFrameNumbers(`${asteroid.type()}`),
      frameRate: 20,
      repeat: -1,
    });

    asteroidSprite.play(`${asteroid.type()}_anim`);
    asteroidSprite.setInteractive();

    return asteroidSprite;
  }

  addShip() {
    this.ship = this.add.sprite(
      CONFIG.width / 2,
      CONFIG.height - 60,
      ASSETS_KEYS.SHIP,
    );
  }

  shootBullet() {
    this.bulletGroup.fireBullet(this.ship.x, this.ship.y - 20);
  }

  loadBullets() {
    this.bulletGroup = new BulletGroup(this);
  }

  resetShipPosition(shipMoved) {
    shipMoved.y = 0;
    shipMoved.x = Math.Between(25, CONFIG.width - 25);
  }

  moveShip(shipMoved, speedMovement) {
    shipMoved.y += speedMovement;
    if (shipMoved.y > CONFIG.height) {
      this.resetShipPosition(shipMoved);
    }
  }

  addEvents() {
    this.input.on('pointermove', (pointer) => {
      this.ship.x = pointer.x;
    });

    this.input.on('pointerdown', () => {
      this.shootBullet();
    });

    this.input.on('gameobjectdown', this.destroyAsteroid, this);

    this.anims.create({
      key: `${ASSETS_KEYS.EXPLOSION}_anim`,
      frames: this.anims.generateFrameNumbers(ASSETS_KEYS.EXPLOSION),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.inputKeys = [
      this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE),
    ];
  }

  create() {
    this.asteroidTypes = ['01', '02', '03', '04', '05'];

    this.addBackground();

    this.asteroidTypes.forEach((type) => {
      const asteroid = new Asteroid(type);

      this[asteroid.type()] = this.addAsteroid(asteroid);

      this.physics.add.collider(this[asteroid.type()], this.ship, () => {
        this.destroyAsteroid();
      });
    });

    this.loadBullets();
    this.addShip();
    this.addEvents();
  }

  update() {
    this.inputKeys.forEach((key) => {
      if (Input.Keyboard.JustDown(key)) {
        this.shootBullet();
      }
    });

    this.asteroidTypes.forEach((type, index) => {
      this.moveShip(this[`${ASSETS_KEYS.ASTEROID}${type}`], index + 1);
    });

    this.background.tilePositionY -= 0.5;
  }
}