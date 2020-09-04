import { Physics } from 'phaser';
import CONFIG from '../config';
import ASSETS_KEYS from '../keys/assets-keys';

export default class Asteroid extends Physics.Arcade.Sprite {
  constructor(type, currentScene, positionX, positionY) {
    super(currentScene, positionX, positionY, `${ASSETS_KEYS.ASTEROID}${type}`);

    currentScene.add.existing(this);
    currentScene.physics.world.enableBody(this);

    this.setInteractive();

    this.typeOf = type;
    this.scene = currentScene;
  }

  reset() {
    this.y = 0;
    this.x = Math.Between(25, CONFIG.width - 25);
  }

  move(asteroidMoved, speedMovement) {
    this.y += speedMovement;
    if (this.y > CONFIG.height) {
      this.reset();
    }
  }



  type() {
    return `${ASSETS_KEYS.ASTEROID}${this.typeOf}`;
  }
}
