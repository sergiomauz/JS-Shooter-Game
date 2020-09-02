import { GameObjects } from 'phaser';
import ASSETS_KEYS from '../components/assets-keys';

export default class Bullet extends GameObjects.Sprite {
  constructor(scene) {
    const { x } = scene.player;
    const y = scene.player.y - 100;
    super(scene, x, y, ASSETS_KEYS.BULLET);
    scene.add.existing(this);

    this.play(`${ASSETS_KEYS.BULLET}_anim`);
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