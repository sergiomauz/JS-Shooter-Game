import { Game } from 'phaser';
import { SCENE_CONSTANTS, GAME_CONFIG } from './helpers/constants';
import GameStartScene from './scenes/gamestart';
import GameOverScene from './scenes/gameover';
import PreloaderScene from './scenes/preloader';
import TitleScene from './scenes/title';
import Top10Scene from './scenes/top10';
import CreditsScene from './scenes/credits';

export default class ShooterGame extends Game {
  constructor() {
    super(GAME_CONFIG);

    this.scene.add(SCENE_CONSTANTS.PRELOADER, PreloaderScene);
    this.scene.add(SCENE_CONSTANTS.TITLE, TitleScene);
    this.scene.add(SCENE_CONSTANTS.TOP10SCORES, Top10Scene);
    this.scene.add(SCENE_CONSTANTS.CREDITS, CreditsScene);
    this.scene.add(SCENE_CONSTANTS.GAME_START, GameStartScene);
    this.scene.add(SCENE_CONSTANTS.GAME_OVER, GameOverScene);

    this.scene.start(SCENE_CONSTANTS.PRELOADER);
  }
}
