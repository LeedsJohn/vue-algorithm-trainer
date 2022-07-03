/*
John Leeds
6/6/2022
algorithm.js
Contains a class Algorithm
*/

export default class Algorithm {
  constructor(name, scrambles, solutions) {
    /* 
    Constructor
    Receives the name of the algorithm (string)
    Receives scrambles that lead to that algorithm (array of strings)
    */
    this.seen = false;
    this.name = name;
    this.scrambles = scrambles;
    this.streak = 0;
    this.turnsUntilShow = null;
    this.solutions = solutions;
    if (this.turnsUntilShow) {
      this.turnsUntilShow = Math.random() * (5 - 2) + 2;
    }
  }
  /**
   * Increases algorithm's streak by 1.
   */
  incrementStreak() {
    this.streak += 1;
  }

  /**
   * Decreases turnsUntilShow by 1
   */
  decrementTurnsUntilShow() {
    if (this.turnsUntilShow) {
      this.turnsUntilShow -= 1;
    }
  }

  /**
   * Resets an algorithm after being answered incorrectly.
   * Sets streak to 0 and (optionally) turnsUntilShow to a random number between 1 and 3.
   * @param {bool} wrongAns Whether turnsUntilShow should be updated.
   */
  reset(wrongAns = true) {
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
  getSolutions() {
    return this.solutions;
  }

  /**
   * Returns one randomly selected scramble
   * @returns {string} The randomly selected scramble.
   */
  getScramble() {
    /*
    getScramble()
    Returns one randomly selected scramble.
    */
    return this.scrambles[Math.floor(Math.random() * this.scrambles.length)];
  }
}
