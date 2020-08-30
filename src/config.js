import * as Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 680,
  height: 700,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};


export default config;