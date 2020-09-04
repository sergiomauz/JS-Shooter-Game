import ASSETS_KEYS from '../keys/assets-keys';

export default class Asteroid {
  constructor(type) {
    this.typeOf = type;
  }

  type() {
    return `${ASSETS_KEYS.ASTEROID}${this.typeOf}`;
  }
}
