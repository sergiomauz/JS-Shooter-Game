import { GameObjects } from 'phaser';
import ASSETS_KEYS from '../keys/assets-keys';

export default class Beam extends GameObjects.Sprite {
  constructor(currentScene) {
    const positionX = currentScene.battlecruiser.x;
    const positionY = currentScene.battlecruiser.y - 100;
    super(currentScene, positionX, positionY, ASSETS_KEYS.BEAM);
    currentScene.add.existing(this);

    this.play(`${ASSETS_KEYS.BEAM}_anim`);
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