import { GameObjects } from 'phaser';
import Explosion from './explosion';
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

  hit(projectile, enemy) {
    console.log('Hit enemy');

    this.newExplosion = new Explosion(this.scene, enemy.x, enemy.y);
    projectile.destroy();
    enemy.reset();

    // this.score += 15;
    // const scoreFormated = this.zeroPad(this.score, 6);
    // this.scoreLabel.text = `SCORE ${scoreFormated}`;
  }

  update() {
    if (this.y < 32) {
      this.destroy();
    }
  }
}