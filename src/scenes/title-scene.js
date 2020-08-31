/* eslint-disable class-methods-use-this */
import { Scene, Display } from 'phaser';
import CONFIG from '../components/config';
import SCENE_KEYS from '../components/scene-keys';

export default class TitleScene extends Scene {
  centerButton(gameObject, offset = 0) {
    Display.Align.In.Center(
      gameObject,
      this.add.zone(
        CONFIG.width / 2,
        CONFIG.height / 1.2 - offset * 60,
        CONFIG.width,
        CONFIG.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) {
    Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }

  create() {
    this.gameButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.GAME);
    });

    this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.OPTIONS);
    });

    this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.CREDITS);
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }
}