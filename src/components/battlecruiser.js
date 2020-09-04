import { Physics } from 'phaser';
import ASSETS_KEYS from '../keys/assets-keys';

export default class BattleCruiser extends Physics.Arcade.Sprite {
  constructor(scene, positionX, positionY) {
    super(scene, positionX, positionY, ASSETS_KEYS.BATTLE_CRUISER);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this.body.setCollideWorldBounds(true);

    this.scene = scene;
  }
}