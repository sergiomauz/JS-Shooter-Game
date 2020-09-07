import { Physics, Math } from 'phaser';
import { ASSETS_CONSTANTS, GAME_CONFIG } from '../helpers/constants';

export default class Asteroid extends Physics.Arcade.Sprite {
  constructor(type, speedMovement, currentScene, positionX, positionY) {
    super(currentScene, positionX, positionY, `${ASSETS_CONSTANTS.ASTEROID}${type}`);

    currentScene.add.existing(this);
    currentScene.physics.world.enableBody(this);

    this.setInteractive();

    this.typeOf = type;
    this.speed = speedMovement;
    this.scene = currentScene;
  }

  reset() {
    this.y = 0;
    this.x = Math.Between(25, GAME_CONFIG.width - 25);
  }

  move() {
    this.y += this.speed;
    if (this.y > GAME_CONFIG.height) {
      this.reset();
    }
  }
}
