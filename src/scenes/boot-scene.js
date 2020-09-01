import { Scene } from 'phaser';
import SCENE_KEYS from '../components/scene-keys';
// import '../assets/styles/fonts.css';

export default class BootScene extends Scene {
  create() {
    this.scene.start(SCENE_KEYS.PRELOADER);
  }
}