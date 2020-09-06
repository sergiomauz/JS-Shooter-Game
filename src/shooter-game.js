import { Game } from 'phaser';
import CONFIG from './config';
import SCENE_KEYS from './keys/scene';
import GameStartScene from './scenes/gamestart-scene';
import GameOverScene from './scenes/gameover-scene';
import PreloaderScene from './scenes/preloader-scene';
import TitleScene from './scenes/title-scene';
import OptionsScene from './scenes/options-scene';
import CreditsScene from './scenes/credits-scene';

export default class ShooterGame extends Game {
  constructor() {
    super(CONFIG);

    this.scene.add(SCENE_KEYS.PRELOADER, PreloaderScene);
    this.scene.add(SCENE_KEYS.TITLE, TitleScene);
    this.scene.add(SCENE_KEYS.OPTIONS, OptionsScene);
    this.scene.add(SCENE_KEYS.CREDITS, CreditsScene);
    this.scene.add(SCENE_KEYS.GAME_START, GameStartScene);
    this.scene.add(SCENE_KEYS.GAME_OVER, GameOverScene);

    this.scene.start(SCENE_KEYS.PRELOADER);
  }
}
