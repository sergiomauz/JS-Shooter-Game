import { GameObjects } from 'phaser';
import ASSETS_KEYS from '../keys/assets';

export default class Top10 extends GameObjects.Sprite {
  constructor(currentScene, positionX, positionY) {
    super(currentScene, positionX, positionY, ASSETS_KEYS.EXPLOSION);
    currentScene.add.existing(this);
    this.play(`${ASSETS_KEYS.EXPLOSION}_anim`);
  }
}
