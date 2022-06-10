/*
John Leeds
6/6/2022
algorithm.js
Contains a class Algorithm
*/

export default class Algorithm {
  constructor(name, scrambles) {
    /* 
    Constructor
    Receives the name of the algorithm (string)
    Receives scrambles that lead to that algorithm (array of strings)
    */
    this.name = name;
    this.scrambles = scrambles;
    this.streak = 0;
    this.turnsUntilShow = null;
    if (this.turnsUntilShow) {
      this.turnsUntilShow = Math.random() * (5 - 2) + 2;
    }
  }

  incrementStreak() {
    /*
    increment()
    Increases streak by 1
    */
    this.streak += 1;
  }

  decrementTurnsUntilShow() {
    /*
    decrementTurnsUntilShow
    Decreases turnsUntilShow by 1
    */
    if (this.turnsUntilShow) {
      this.turnsUntilShow -= 1;
    }
  }

  reset(wrongAns = true) {
    /*
    Sets streak to 0 and turnsUntilShow to a random number between
    1 and 3
    */
    this.streak = 0;
    if (wrongAns) {
      this.turnsUntilShow = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    } else {
      self.turnsUntilShow = null;
    }
  }

  // GETTERS
  getName() {
    return this.name;
  }
  getStreak() {
    return this.streak;
  }
  getTurnsUntilShow() {
    return this.turnsUntilShow;
  }
  getScramble() {
    /*
    getScramble()
    Returns one randomly selected scramble.
    */
    return this.scrambles[Math.floor(Math.random() * this.scrambles.length)];
  }
}
