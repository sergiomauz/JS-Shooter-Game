import { Game } from 'phaser';
import Config from '../config';
import SplashScene from '../scenes/simple-scene';

class ShooterGame extends Game {
  constructor() {
    Config.scene = new SplashScene();
    super(Config);
    this.scene.add('INIT', SplashScene);
  }
}

export default ShooterGame;