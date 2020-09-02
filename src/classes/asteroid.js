import ASSETS_KEYS from '../components/assets-keys';

export default class Asteroid {
  constructor(type) {
    this.typeOf = type;
  }

  type() {
    return `${ASSETS_KEYS.ASTEROID}${this.typeOf}`;
  }
}
