/* eslint-disable class-methods-use-this */
import { Scene, Input, Math } from 'phaser';
import BulletGroup from '../classes/bullet-group';
import CONFIG from '../components/config';

export default class GameScene extends Scene {
  addBackground() {
    this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'spaceBackground');
    this.background.setOrigin(0, 0);
  }

  destroyAsteroid(pointer, gameObject) {
    gameObject.setTexture('explosion');
    gameObject.play('explosion_anim');
  }

  addAsteroids() {
    this.asteroid01 = this.add.sprite(Math.Between(0, CONFIG.width) - 100, 0, 'asteroid01');
    this.asteroid02 = this.add.sprite(Math.Between(0, CONFIG.width) - 75, 0, 'asteroid02');
    this.asteroid03 = this.add.sprite(Math.Between(0, CONFIG.width) - 50, 0, 'asteroid03');
    this.asteroid04 = this.add.sprite(Math.Between(0, CONFIG.width) - 25, 0, 'asteroid04');
    this.asteroid05 = this.add.sprite(Math.Between(0, CONFIG.width), 0, 'asteroid05');

    this.anims.create({
      key: 'asteroid01_anim',
      frames: this.anims.generateFrameNumbers('asteroid01'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid02_anim',
      frames: this.anims.generateFrameNumbers('asteroid02'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid03_anim',
      frames: this.anims.generateFrameNumbers('asteroid03'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid04_anim',
      frames: this.anims.generateFrameNumbers('asteroid04'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid05_anim',
      frames: this.anims.generateFrameNumbers('asteroid05'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'explosion_anim',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.asteroid01.play('asteroid01_anim');
    this.asteroid02.play('asteroid02_anim');
    this.asteroid03.play('asteroid03_anim');
    this.asteroid04.play('asteroid04_anim');
    this.asteroid05.play('asteroid05_anim');

    this.asteroid01.setInteractive();
    this.asteroid02.setInteractive();
    this.asteroid03.setInteractive();
    this.asteroid04.setInteractive();
    this.asteroid05.setInteractive();

    this.input.on('gameobjectdown', this.destroyAsteroid, this);
  }

  addShip() {
    this.ship = this.add.sprite(CONFIG.width / 2, CONFIG.height - 60, 'ship');
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

    this.physics.physics.add.collider(this.asteroid01, this.ship, () => {
      destroyAsteroid();
    });
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