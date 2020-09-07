import fetch from 'node-fetch';
import API_KEYS from '../keys/api';
import 'babel-polyfill';

export default class Leaderboard {
  constructor() {
    this.urlAPI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API_KEYS.LEADERBOARD}/scores/`;
  }

  async saveScore(playerName, playerScore) {
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        user: playerName,
        score: playerScore,
      }),
    };

    this.info = await fetch(this.urlAPI, fetchConfig)
      .then((responseData) => responseData.text())
      .then((jsonData) => ({
        code: 1,
        msg: jsonData.result,
      }))
      .catch((err) => ({
        code: 0,
        msg: err,
      }));

    return this.info;
  }

  async getScoreAsync() {
    this.info = await fetch(this.urlAPI)
      .then((responseData) => responseData.json())
      .then((jsonData) => {
        const answer = [];

        jsonData.result.forEach((item) => {
          answer.push({ user: item.user, score: parseInt(item.score, 10) });
        });

        return {
          code: 1,
          data: answer.sort((itemA, itemB) => itemB.score - itemA.score).slice(0, 10),
        };
      })
      .catch(() => ({
        code: 0,
        data: [],
      }));
    return this.info;
  }
}