import { Physics, Math } from 'phaser';
import CONFIG from '../config';
import ASSETS_KEYS from '../keys/assets';

export default class Asteroid extends Physics.Arcade.Sprite {
  constructor(type, speedMovement, currentScene, positionX, positionY) {
    super(currentScene, positionX, positionY, `${ASSETS_KEYS.ASTEROID}${type}`);

    currentScene.add.existing(this);
    currentScene.physics.world.enableBody(this);

    this.setInteractive();

    this.typeOf = type;
    this.speed = speedMovement;
    this.scene = currentScene;
  }

  reset() {
    this.y = 0;
    this.x = Math.Between(25, CONFIG.width - 25);
  }

  move() {
    this.y += this.speed;
    if (this.y > CONFIG.height) {
      this.reset();
    }
  }

  type() {
    return `${ASSETS_KEYS.ASTEROID}${this.typeOf}`;
  }
}
