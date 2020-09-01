export default class Player {
  constructor() {
    this.lifes = 3;
  }

  getLifes() {
    return this.lifes;
  }

  wasDefeated() {
    if (this.lifes === 0) {
      return true;
    }
    return false;
  }

  die() {
    this.lifes -= 1;
  }
}
