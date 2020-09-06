/* eslint-disable class-methods-use-this */
import { Scene, Display } from 'phaser';
import CONFIG from '../config';
import SCENE_KEYS from '../keys/scene';
import ASSETS_KEYS from '../keys/assets';

export default class TitleScene extends Scene {
  addBackground() {
    this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, `${ASSETS_KEYS.SPACE_BACKGROUND}`);
    this.background.setOrigin(0, 0);
  }

  addMenu() {
    this.gameButton = this.add.sprite(300, 200, ASSETS_KEYS.BUTTON).setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.GAME_START, { playerName: this.playerNameInput.text.trim() });
    });

    this.optionsButton = this.add.sprite(300, 200, ASSETS_KEYS.BUTTON).setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.OPTIONS);
    });

    this.creditsButton = this.add.sprite(300, 200, ASSETS_KEYS.BUTTON).setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', () => {
      this.scene.start(SCENE_KEYS.CREDITS);
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_KEYS.BUTTON_ON_HOVER);
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_KEYS.BUTTON);
    });

    this.playerNameLabel = this.add.sprite(300, 200, ASSETS_KEYS.INPUT_NAME);
    this.centerButton(this.playerNameLabel, 2.5);

    this.playerNameInput = this.add.text(0, 0, 'PLAYER NAME', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.playerNameInput, this.playerNameLabel);
  }

  validateInputKey(input) {
    if (input.key !== 'Backspace'
      && input.key !== 'Enter'
      && input.key !== 'Shift'
      && input.key !== 'Alt'
      && input.key !== 'Tab'
      && input.key !== 'Control'
      && input.key !== 'Dead'
      && !(input.keyCode >= 37 && input.keyCode <= 40)
      && !(input.keyCode >= 112 && input.keyCode <= 123)
    ) {
      return true;
    }
    return false;
  }

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

  handleInputKeys(inputField, inputValue) {
    this.input.keyboard.on('keydown', (e) => {
      if (e.key === 'Backspace' && inputValue.length > 0) {
        inputValue = inputValue.slice(0, inputValue.length - 1);
        inputField.setText(`${inputValue.toUpperCase()}`);
      } else if (this.validateInputKey(e) && inputValue.length < 11) {
        inputValue += e.key;
        inputField.setText(`${inputValue.toUpperCase()}`);
      }
    });
  }

  create() {
    this.addBackground();

    this.add.image(400, 175, ASSETS_KEYS.LOGO);

    this.addMenu();
  }

  update() {
    this.background.tilePositionY -= 0.5;

    this.handleInputKeys(this.playerNameInput, this.playerNameInput.text);
    this.centerButtonText(this.playerNameInput, this.playerNameLabel);
  }
}