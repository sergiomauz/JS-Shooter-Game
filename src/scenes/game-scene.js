/* eslint-disable class-methods-use-this */
import { Scene, Input, Math } from 'phaser';
import BulletGroup from '../classes/bullet-group';
import CONFIG from '../components/config';

export default class GameScene extends Scene {
  addBackground() {
    // this.background = this.add.image(0, 0, 'spaceBackground');
    this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'spaceBackground');
    this.background.setOrigin(0, 0);
  }

  addAsteroids() {
    this.asteroid01 = this.add.image(Math.Between(0, CONFIG.width) - 100, 0, 'asteroid01');
    this.asteroid02 = this.add.image(Math.Between(0, CONFIG.width) - 75, 0, 'asteroid02');
    this.asteroid03 = this.add.image(Math.Between(0, CONFIG.width) - 50, 0, 'asteroid03');
    this.asteroid04 = this.add.image(Math.Between(0, CONFIG.width) - 25, 0, 'asteroid04');
    this.asteroid05 = this.add.image(Math.Between(0, CONFIG.width), 0, 'asteroid05');
  }

  addShip() {
    this.ship = this.add.image(CONFIG.width / 2, CONFIG.height - 60, 'ship');
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

    this.inputKeys = [
      this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE),
    ];
  }

  create() {
    this.addBackground();
    this.addAsteroids();
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

    this.moveShip(this.asteroid01, 1);
    this.moveShip(this.asteroid02, 2);
    this.moveShip(this.asteroid03, 3);
    this.moveShip(this.asteroid04, 4);
    this.moveShip(this.asteroid05, 5);

    this.background.tilePositionY -= 0.5;
  }
}