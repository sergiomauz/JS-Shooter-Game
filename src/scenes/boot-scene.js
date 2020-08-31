import { Scene } from 'phaser';
import SCENE_KEYS from '../components/scene-keys';
// import '../assets/styles/fonts.css';

export default class BootScene extends Scene {
  preload() {
    this.load.image('logos', 'assets/space_craft_logo.png');
  }

  create() {
    this.scene.start(SCENE_KEYS.PRELOADER);
  }
}