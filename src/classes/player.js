export default class Player {
  constructor(name) {
    this.lives = 3;
    this.score = 0;
    this.name = name;
  }

  addScore(type) {
    this.score += 10 * type;
    return this.score;
  }

  getScore() {
    return this.score;
  }

  getLives() {
    return this.lives;
  }

  wasDefeated() {
    if (this.lives === 0) {
      return true;
    }
    return false;
  }

  die() {
    this.lives -= 1;
  }
}
