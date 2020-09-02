export default class Player {
  constructor() {
    this.lifes = 3;
    this.score = 0;
  }

  addScore(type) {
    this.score += 10 * type;
    return this.score;
  }

  getScore() {
    return this.score;
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
