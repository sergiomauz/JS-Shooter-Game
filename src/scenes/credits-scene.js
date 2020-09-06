import { Scene, Display } from 'phaser';
import CONFIG from '../config';
import SCENE_KEYS from '../keys/scene';
import ASSETS_KEYS from '../keys/assets';

export default class CreditsScene extends Scene {
  addBackground() {
    this.background = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, `${ASSETS_KEYS.SPACE_BACKGROUND}`);
    this.background.setOrigin(0, 0);
  }

  create() {
    this.addBackground();

    this.creditsText = this.add.image(
      0,
      0,
      ASSETS_KEYS.CREDITS,
    );

    this.madeByText = this.add.text(
      0,
      0,
      'CREATED BY:\nSergio Zambrano\n\n\n\nASSETS FROM:\nStarcraft - Blizzard Entertainment',
      {
        fontSize: '26px',
        fill: '#0f0',
        align: 'center',
      },
    );

    this.zone = this.add.zone(
      CONFIG.width / 2,
      CONFIG.height / 2,
      CONFIG.width,
      CONFIG.height,
    );

    Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add(
      {
        targets: this.creditsText,
        y: -100,
        ease: 'Power1',
        duration: 4000,
        delay: 1000,
      },
    );

    this.madeByTween = this.tweens.add(
      {
        targets: this.madeByText,
        y: -200,
        ease: 'Power1',
        duration: 8000,
        delay: 1000,
        onComplete: () => {
          this.scene.start(SCENE_KEYS.TITLE);
        },
      },
    );
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}