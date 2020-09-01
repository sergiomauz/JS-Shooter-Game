import Player from '../src/classes/player';

test('When a Player is created, he/she has 3 lifes.', () => {
  const player = new Player();
  expect(player.getLifes()).toBe(3);
});

test('When a player dies, he/she loses a life.', () => {
  const player = new Player();
  player.die();
  expect(player.getLifes()).toBe(2);
});

test('When a player dies 3 times, the player is defeated and game must be finished.', () => {
  const player = new Player();
  player.die();
  player.die();
  player.die();
  expect(player.getLifes()).toBe(0);
  expect(player.wasDefeated()).toBe(true);
});
