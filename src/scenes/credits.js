import { Scene, Display } from 'phaser';
import General from '../helpers/general';
import { ASSETS_CONSTANTS, SCENE_CONSTANTS, GAME_CONFIG } from '../helpers/constants';

export default class CreditsScene extends Scene {
  create() {
    General.addBackground(this);

    this.creditsText = this.add.image(
      0,
      0,
      ASSETS_CONSTANTS.CREDITS,
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
      GAME_CONFIG.width / 2,
      GAME_CONFIG.height / 2,
      GAME_CONFIG.width,
      GAME_CONFIG.height,
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
          this.scene.start(SCENE_CONSTANTS.TITLE);
        },
      },
    );
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}