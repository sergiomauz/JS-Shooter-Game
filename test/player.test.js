import Player from '../src/classes/player';

test('When a Player is created, he/she has 3 lives.', () => {
  const player = new Player();
  expect(player.getLives()).toBe(3);
});

test('When a player dies, he/she loses a life.', () => {
  const player = new Player();
  player.die();
  expect(player.getLives()).toBe(2);
});

test('When a player dies 3 times, the player is defeated and game must be finished.', () => {
  const player = new Player();
  player.die();
  player.die();
  player.die();
  expect(player.getLives()).toBe(0);
  expect(player.wasDefeated()).toBe(true);
});

test('When a player dies less than 3 times, the player is alive and game must be finished.', () => {
  const player = new Player();
  player.die();
  player.die();
  expect(player.getLives()).toBe(1);
  expect(player.wasDefeated()).not.toBe(true);
});

test('When a player shoots to an asteroid, the score increases depending on the asteroid type.', () => {
  const player = new Player();
  player.addScore(1);
  expect(player.getScore()).toBe(10);
  player.addScore(2);
  expect(player.getScore()).toBe(30);
  player.addScore(3);
  expect(player.getScore()).toBe(60);
  player.addScore(4);
  expect(player.getScore()).toBe(100);
  player.addScore(5);
  expect(player.getScore()).toBe(150);
  player.addScore(-2);
  expect(player.getScore()).toBe(130);
});
