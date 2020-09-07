import { GameObjects } from 'phaser';
import { ASSETS_CONSTANTS } from '../helpers/constants';

export default class Beam extends GameObjects.Sprite {
  constructor(currentScene) {
    const positionX = currentScene.battlecruiser.x;
    const positionY = currentScene.battlecruiser.y - 100;
    super(currentScene, positionX, positionY, ASSETS_CONSTANTS.BEAM);
    currentScene.add.existing(this);

    this.play(`${ASSETS_CONSTANTS.BEAM}_anim`);
    currentScene.physics.world.enableBody(this);
    this.body.velocity.y = -250;

    currentScene.projectiles.add(this);
  }

  update() {
    if (this.y < 32) {
      this.destroy();
    }
  }
}