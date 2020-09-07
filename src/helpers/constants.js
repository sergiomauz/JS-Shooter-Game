const GAME_CONFIG = {
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};

const SCENE_CONSTANTS = {
  GAME_START: 'Game_Start',
  GAME_OVER: 'Game_Over',
  CREDITS: 'Credits',
  PRELOADER: 'Preloader',
  TITLE: 'Title',
  TOP10SCORES: 'Top10Scores',
};

const ASSETS_CONSTANTS = {
  BATTLE_CRUISER: 'battlecruiser',
  BEAM: 'beam',
  GAME_OVER: 'gameover',
  TOP_TEN: 'top10',
  CREDITS: 'credits',
  INPUT_NAME: 'inputName',
  LIFE: 'life',
  PILOT: 'pilot',
  SPACE_BACKGROUND: 'spaceBackground',
  LOGO: 'phaserLogo',
  BUTTON: 'button',
  BUTTON_ON_HOVER: 'buttonOnHover',
  UNCHECKED_BOX: 'uncheckedBox',
  CHECKED_BOX: 'checkedBox',
  ASTEROID: 'asteroid',
  EXPLOSION: 'explosion',
  BG_MUSIC: 'bgMusic',
  EXPLOSION_SOUND: 'exposionAudio',
  PIXEL_FONT: 'pixelFont',
};

export { SCENE_CONSTANTS, ASSETS_CONSTANTS, GAME_CONFIG };