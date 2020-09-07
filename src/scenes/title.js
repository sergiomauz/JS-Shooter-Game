/* eslint-disable class-methods-use-this */
import { Scene, Display } from 'phaser';
import { ASSETS_CONSTANTS, SCENE_CONSTANTS, GAME_CONFIG } from '../helpers/constants';
import General from '../helpers/general';

export default class TitleScene extends Scene {
  addMenu() {
    this.gameButton = this.add.sprite(300, 200, ASSETS_CONSTANTS.BUTTON).setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start(SCENE_CONSTANTS.GAME_START,
        {
          playerName: this.playerNameInput.text.trim(),
        });
    });

    this.scoresButton = this.add.sprite(300, 200, ASSETS_CONSTANTS.BUTTON).setInteractive();
    this.centerButton(this.scoresButton);

    this.scoresText = this.add.text(0, 0, 'Top 10', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.scoresText, this.scoresButton);

    this.scoresButton.on('pointerdown', () => {
      this.scene.start(SCENE_CONSTANTS.TOP10SCORES);
    });

    this.creditsButton = this.add.sprite(300, 200, ASSETS_CONSTANTS.BUTTON).setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#2BF607' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', () => {
      this.scene.start(SCENE_CONSTANTS.CREDITS);
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_CONSTANTS.BUTTON_ON_HOVER);
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture(ASSETS_CONSTANTS.BUTTON);
    });

    this.playerNameLabel = this.add.sprite(300, 200, ASSETS_CONSTANTS.INPUT_NAME);
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
        GAME_CONFIG.width / 2,
        GAME_CONFIG.height / 1.2 - offset * 60,
        GAME_CONFIG.width,
        GAME_CONFIG.height,
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
    General.addBackground(this);

    this.add.image(400, 175, ASSETS_CONSTANTS.LOGO);

    this.addMenu();
  }

  update() {
    this.background.tilePositionY -= 0.5;

    this.handleInputKeys(this.playerNameInput, this.playerNameInput.text);
    this.centerButtonText(this.playerNameInput, this.playerNameLabel);
  }
}