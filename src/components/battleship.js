import { Physics } from 'phaser';
import ASSETS_KEYS from '../keys/assets-keys';

export default class BattleShip extends Physics.Arcade.Sprite {
  constructor(scene, positionX, positionY) {
    super(scene, positionX, positionY, ASSETS_KEYS.SHIP);
    this.scene = scene;
    this.body.setCollideWorldBounds(true);
  }
}