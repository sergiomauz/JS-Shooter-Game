import { Game } from 'phaser';
import CONFIG from './components/config';
import SCENE_KEYS from './components/scene-keys';
import GameScene from './scenes/game-scene';
import BootScene from './scenes/boot-scene';
import PreloaderScene from './scenes/preloader-scene';
import TitleScene from './scenes/title-scene';
import OptionsScene from './scenes/options-scene';
import CreditsScene from './scenes/credits-scene';

export default class ShooterGame extends Game {
  constructor() {
    CONFIG.scene = new BootScene();
    super(CONFIG);

    this.scene.add(SCENE_KEYS.BOOT, BootScene);
    this.scene.add(SCENE_KEYS.PRELOADER, PreloaderScene);
    this.scene.add(SCENE_KEYS.TITLE, TitleScene);
    this.scene.add(SCENE_KEYS.OPTIONS, OptionsScene);
    this.scene.add(SCENE_KEYS.CREDITS, CreditsScene);
    this.scene.add(SCENE_KEYS.GAME, GameScene);

    this.scene.start(SCENE_KEYS.BOOT);
  }
}
