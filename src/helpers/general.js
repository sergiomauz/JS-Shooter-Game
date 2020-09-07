import { ASSETS_CONSTANTS, GAME_CONFIG } from './constants';

const general = (() => {
  const zeroPad = (number, size) => {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = `0${stringNumber}`;
    }
    return stringNumber;
  };

  const addBackground = (currentScene) => {
    currentScene.background = currentScene.add.tileSprite(0,
      0,
      GAME_CONFIG.width,
      GAME_CONFIG.height,
      ASSETS_CONSTANTS.SPACE_BACKGROUND);

    currentScene.background.setOrigin(0, 0);
  };

  const validateInputKey = (input) => {
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
  };

  const handleInputKeys = (currentScene, inputField, inputValue) => {
    currentScene.input.keyboard.on('keydown', (e) => {
      if (e.key === 'Backspace' && inputValue.length > 0) {
        inputValue = inputValue.slice(0, inputValue.length - 1);
        inputField.setText(`${inputValue.toUpperCase()}`);
      } else if (validateInputKey(e) && inputValue.length < 11) {
        inputValue += e.key;
        inputField.setText(`${inputValue.toUpperCase()}`);
      }
    });
  };

  return {
    addBackground, zeroPad, validateInputKey, handleInputKeys,
  };
})();

export default general;