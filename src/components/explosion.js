import { GameObjects } from 'phaser';
import ASSETS_KEYS from '../keys/assets-keys';

export default class Explosion extends GameObjects.Sprite {
  constructor(currentScene, positionX, positionY) {
    super(currentScene, positionX, positionY, ASSETS_KEYS.EXPLOSION);
    currentScene.add.existing(this);
    this.play(`${ASSETS_KEYS.EXPLOSION}_anim`);
  }
}
