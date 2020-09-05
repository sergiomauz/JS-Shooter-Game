import API_KEYS from '../keys/api-keys';

export default class Leaderboard {
  constructor() {
    this.urlAPI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API_KEYS.LEADERBOARD}/scores/`;
  }

  // saveScore(playerName, score) { }
  async getScore() {
    this.info = await fetch(this.urlAPI)
      .then((responseData) => responseData.json())
      .then((jsonData) => {
        /*
        let code = 0;
        let data = {
          message: jsonData.message,
        };

        if (jsonData.cod === 200) {
          code = 1;
          data = {
            message: 'OK',
            coordinates: {
              latitude: jsonData.coord.lat,
              longitude: jsonData.coord.lon,
            },
          };
        } else if (jsonData.cod === 401) {
          code = -1;
        }

        return {
          result: code,
          data,
        };
        */
      })
      .catch((err) => ({
        result: -1,
        data: err.message,
      }));

    return this.info;
  }
}