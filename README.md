# JS Shooter Game
> It is a simple shooting videogame, created as a capstone project using JavaScript, for Microverse. Only for learning purposes.

![screenshot](https://user-images.githubusercontent.com/36812672/92332123-e8a63000-f040-11ea-8d23-72e939450070.png))

## Details of the Game

### How to play with?
You are the pilot of a battlecruiser (maybe one among dozens), and your task is destroy all the asteroids that you can for saving the Earth. In order to comply with this important duty, you can drive the battlecruiser using arrow keys (🡱🡳🡰🡲) and shoot a Yamato Beam using **spacebar**.

To start, you shoould type your name (at most 11 characters). If you left a blank input, you will be registered as `UNNAMED`.

When you click on **Play**, the battlecruiser will start in the bottom of the screen, and the asteroids will fall from the top with differents velocities.

The most important goal is getting the highest score. Your name will be put in the Top 10 if get a good score. Now, try to consider:
- There 5 kinds of asteroids.
- If you destroy the fastest kind of asteroid, you will get +25 points for your score.
- If you destroy the slowest kind of asteroid, you will get +5 points for your score.
- You will see at most 5 asteroids on your screen. When you destroy one, it returns from the top immediately.
- You will lose if your battlecruiser receives three hits.

### Scenes
- **Preloader**: Preloads all assets and configurations for the game.
- **Title**: Loads the logo and options for the game (for playing, show credits and show top 10).
- **Top10**: Shows the top 10 scores gotten for the players.
- **Credits**: Shows the credits for the author of this videogame and the author of the assets.
- **Game Start**: Displays the main scene and start the game. Here you can drive the battlecruiser and shoot beams.
- **Game Over**: When you lose, this scene shows your score.

### Built With

- Node JS
- Webpack
- Javascript
- Babel
- Phaser
- Jest

## Live Demo

Check out the live demo [here](https://phaser-spacecraft.netlify.app/)


## Getting started

### Pre Requisites

- Go to account in [Leaderboard API](https://www.notion.so/Leaderboard-API-service-24c0c3c116974ac49488d4eb0267ade3) and get a Key for you.
- Install Node JS. ([NodeJS Documentation](https://nodejs.org/en/docs/)) 
- Install Webpack. ([Webpack Documentation](https://webpack.js.org/guides/installation/)) 


### Install

- Clone this repository in your terminal using **git clone** command.
- Enter the repo directory.
- Open the `src/keys/api.js` file and edit the value for `LEADERBOARD`. Use your own API Keys gotten from Leaderboard API.
- Run `npm install` && `npm run build` in your terminal.

### Tests

- Run `npm run test` in your terminal.


### Usage
- Run `npm run server` in your terminal.
- Open **http://localhost:8080** in your browser.
- Enjoy :)


## Potential Features
- Full screen mode.
- Power ups when shooting to special asteroids.
- More audios for specifics scenes (Title, Game Start, Game Over, Top 10).
- Possibility for choosing among different battlecruisers.


## Author

👤 **Sergio Zambrano**

- Github: [@sergiomauz](https://github.com/sergiomauz)
- Twitter: [@sergiomauz](https://twitter.com/sergiomauz)
- Linkedin: [Sergio Zambrano](https://www.linkedin.com/in/sergiomauz/)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](../../issues/).


## Show your support

Give a ⭐️ if you like this project!


## Acknowledgments

- Most of the characters assets belongs to [Blizzard Entertainment](https://www.blizzard.com/) and the game [Starcraft](https://starcraft.com/) (Battlecruiser, pilot, colors, etc).
- Audios were downloaded from [Open Game Art](https://opengameart.org/)
- Microverse, for the lessons and tips.

## 📝 License

This project is [MIT](./LICENSE) licensed.