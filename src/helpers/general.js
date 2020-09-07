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

  return { addBackground, zeroPad };
})();

export default general;