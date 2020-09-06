import { Physics, Input } from 'phaser';
import Player from '../classes/player';
import Explosion from './explosion';
import Beam from './beam';
import ASSETS_KEYS from '../keys/assets';
import CONFIG from '../config';

export default class BattleCruiser extends Physics.Arcade.Sprite {
  constructor(currentScene, playerName, positionX, positionY) {
    super(currentScene, positionX, positionY, ASSETS_KEYS.BATTLE_CRUISER);

    currentScene.add.existing(this);
    currentScene.physics.world.enableBody(this);

    this.body.setCollideWorldBounds(true);
    this.scene = currentScene;
    this.player = new Player(playerName);
  }

  move(cursorKeys) {
    this.setVelocity(0);

    if (cursorKeys.left.isDown) {
      this.setVelocityX(-600);
    } else if (cursorKeys.right.isDown) {
      this.setVelocityX(600);
    }

    if (cursorKeys.up.isDown) {
      this.setVelocityY(-600);
    } else if (cursorKeys.down.isDown) {
      this.setVelocityY(600);
    }
  }

  shoot(spacebar) {
    if (Input.Keyboard.JustDown(spacebar)) {
      if (this.alpha >= 1 && this.active) {
        this.newBeam = new Beam(this.scene);
      }
    }
  }

  reset() {
    const positionX = CONFIG.width / 2;
    const positionY = CONFIG.height;

    this.enableBody(true, positionX, positionY, true, true);

    this.alpha = 0.5;
    this.scene.tweens.add({
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
    enemy.reset();
    if (currentPlayer.alpha < 1) {
      return;
    }

    this.newExplosion = new Explosion(currentPlayer.scene, currentPlayer.x, currentPlayer.y);
    currentPlayer.disableBody(true, true);
    currentPlayer.scene.time.addEvent({
      delay: 1000,
      callback: currentPlayer.reset,
      callbackScope: currentPlayer,
      loop: false,
    });

    this.player.lives -= 1;
    currentPlayer.scene.sound.play(ASSETS_KEYS.EXPLOSION_SOUND, { volume: 0.1 });
    currentPlayer.scene.lives.setTexture(`${ASSETS_KEYS.LIFE}0${this.player.lives}`);
  }

  hitEnemy(projectile, enemy) {
    this.newExplosion = new Explosion(this.scene, enemy.x, enemy.y);
    this.player.score += 5 * enemy.speed;
    projectile.destroy();
    enemy.reset();
    this.scene.sound.play(ASSETS_KEYS.EXPLOSION_SOUND, { volume: 0.1 });
  }
}