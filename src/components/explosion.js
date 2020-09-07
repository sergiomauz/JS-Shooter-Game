import { GameObjects } from 'phaser';
import { ASSETS_CONSTANTS } from '../helpers/constants';

export default class Explosion extends GameObjects.Sprite {
  constructor(currentScene, positionX, positionY) {
    super(currentScene, positionX, positionY, ASSETS_CONSTANTS.EXPLOSION);
    currentScene.add.existing(this);
    this.play(`${ASSETS_CONSTANTS.EXPLOSION}_anim`);
  }
}
