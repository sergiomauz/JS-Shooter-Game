import { Physics } from 'phaser';
import Player from '../classes/player';
import Explosion from './explosion';
import ASSETS_KEYS from '../keys/assets-keys';
import CONFIG from '../config';

export default class BattleCruiser extends Physics.Arcade.Sprite {
  constructor(scene, positionX, positionY) {
    super(scene, positionX, positionY, ASSETS_KEYS.BATTLE_CRUISER);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this.body.setCollideWorldBounds(true);

    this.scene = scene;
    this.player = new Player('Sergio');
  }

  reset() {
    const x = CONFIG.width / 2;
    const y = CONFIG.height;
    this.enableBody(true, x, y, true, true);

    this.alpha = 0.5;
    this.tweens.add({
      targets: this,
      y: CONFIG.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete() {
        this.alpha = 1;
      },
      callbackScope: this,
    });
  }

  hurt(currentPlayer, enemy) {
    // this.resetAsteroidPosition(enemy);

    if (this.alpha < 1) {
      return;
    }

    this.newExplosion = new Explosion(this, currentPlayer.x, currentPlayer.y);
    currentPlayer.disableBody(true, true);
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  }
}