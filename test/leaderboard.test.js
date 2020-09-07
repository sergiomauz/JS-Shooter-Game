import Leaderboard from '../src/classes/leaderboard';

const leaderboard = new Leaderboard();

test('When a Leaderboard is created and request scores, has CODE and DATA properties.', async () => {
  const top10 = await leaderboard.getScoreAsync();

  expect(top10).toHaveProperty('code');
  expect(top10).toHaveProperty('data');
});

test('When a Leaderboard request scores, DATA property has an array of objects with USER and SCORE properties.', async () => {
  const top10 = await leaderboard.getScoreAsync();

  if (top10.data.length > 0) {
    expect(top10.data[0]).toHaveProperty('user');
    expect(top10.data[0]).toHaveProperty('score');
  } else {
    expect(Array.isArray(top10.data)).toBe(true);
  }
});

test('When a Leaderboard request scores and fails, DATA is an empty array.', async () => {
  leaderboard.urlAPI = '';

  const top10 = await leaderboard.getScoreAsync();
  if (top10.code === 0) {
    expect(Array.isArray(top10.data)).toBe(true);
    expect(top10.data.length).toBe(0);
  }
});

test('When a Leaderboard register a new score, receive a specific message.', async () => {
  const register = await leaderboard.saveScore('Jest Test', parseInt(500 * Math.random() + 100, 10));
  if (register.code === 1) {
    expect(register.msg).toEqual('Leaderboard score created correctly.');
  }
});
