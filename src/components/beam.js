import { GameObjects } from 'phaser';
import ASSETS_KEYS from '../keys/assets-keys';

export default class Beam extends GameObjects.Sprite {
  constructor(scene) {
    const { x } = scene.battlecruiser;
    const y = scene.battlecruiser.y - 100;
    super(scene, x, y, ASSETS_KEYS.BEAM);
    scene.add.existing(this);

    this.play(`${ASSETS_KEYS.BEAM}_anim`);
    scene.physics.world.enableBody(this);
    this.body.velocity.y = -250;

    scene.projectiles.add(this);
  }

  update() {
    if (this.y < 32) {
      this.destroy();
    }
  }
}