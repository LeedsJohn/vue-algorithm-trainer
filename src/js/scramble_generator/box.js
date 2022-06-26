/*
John Leeds
6/6/2022
box.py

Contains datastructure Box which holds Algorithms
*/
export default class Box {
  constructor() {
    this.algorithms = [];
  }

  /**
   * Removes an algorithm from the box
   * @param {Algorithm} alg The algorithm to remove.
   */
  erase(alg) {
    this.algorithms = this.algorithms.filter(function (value) {
      return value !== alg;
    });
  }

  /**
   * Adds an algorithm to the box.
   * @param {Algorithm} algorithm The algorithm to add to the box.
   */
  add(algorithm) {
    this.algorithms.push(algorithm);
  }

  /**
   * Removes and returns the last algorithm in the box.
   * @returns {Algorithm} The last algorithm.
   */
  pop() {
    return this.algorithms.pop();
  }

  /**
   * Gets the length of the box.
   * @returns {integer} The number of algorithms in the box.
   */
  length() {
    return this.algorithms.length;
  }

  /**
   * Picks a randomly selected algorithm from the box.
   * @returns {Algorithm} Randomly selected algorithm.
   */
  getAlgorithm() {
    return this.algorithms[Math.floor(Math.random() * this.algorithms.length)];
  }

  /**
   * Gets the algorithm in the box with the minimum turnsUntilShow.
   * @returns {Algorithm} The algorithm with the minimum turnsUntilShow
   */
  getMinAlgorithm() {
    let minTurns = this.algorithms[0].getTurnsUntilShow();
    let minAlg = this.algorithms[0];

    for (let i = 0; i < this.algorithms.length; i++) {
      if (this.algorithms[i].getTurnsUntilShow() < minTurns) {
        minTurns = this.algorithms[i].getTurnsUntilShow();
        minAlg = this.algorithms[i];
      }
    }
    return minAlg;
  }

  /**
   * Determines if there is an algorithm that is due to be shown.
   * @returns {bool} Returns true if there is an algorithm in the box where turnsUntilShow <= 0.
   */
  urgentShowExists() {
    /*
    urgentShowExists
    Returns true if there is an algorithm in the box
    where turnsUntilShow <= 0
    */
    for (let i = 0; i < this.algorithms.length; i++) {
      if (this.algorithms[i].getTurnsUntilShow() <= 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Subtracts 1 from every algorithm's turnsUntilShow
   */
  passRound() {
    for (let i = 0; i < this.algorithms.length; i++) {
      this.algorithms[i].decrementTurnsUntilShow();
    }
  }

  /**
   * Shuffles the algorithms.
   * Courtesy of https://stackoverflow.com/a/12646864
   */
  shuffle() {
    for (let i = this.algorithms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.algorithms[i], this.algorithms[j]] = [
        this.algorithms[j],
        this.algorithms[i],
      ];
    }
  }

  /**
   * Determines if an algorithm exists in the box.
   * @param   {Algorithm} alg The algorithm to check for.
   * @returns {bool}          True if the algorithm is in the box; else, false.
   */
  exists(alg) {
    for (let i = 0; i < this.algorithms.length; i++) {
      if (this.algorithms[i] === alg) {
        return true;
      }
    }
    return false;
  }
}
