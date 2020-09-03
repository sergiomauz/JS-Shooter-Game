import { GameObjects } from 'phaser';
import ASSETS_KEYS from '../components/assets-keys';

export default class Explosion extends GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, ASSETS_KEYS.EXPLOSION);
    scene.add.existing(this);
    this.play(`${ASSETS_KEYS.EXPLOSION}_anim`);
  }
}
