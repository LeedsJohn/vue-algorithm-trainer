/*
John Leeds
6/6/2022
box.py

Contains datastructure Box which holds Algorithms
*/
// import Algorithm from "./algorithm.js";

export default class Box {
  constructor() {
    this.algorithms = [];
  }
  erase(alg) {
    /*
    erase()
    Receives an algorithm to remove from the algorithms (list)
    */
    // TODO: maybe should be value.getName === alg.getName etc
    // TODO: maybe should be this.algorithms.filter(function (value, index, arr)
    this.algorithms.filter(function (value) {
      return value === alg;
    });
  }

  add(algorithm) {
    /*
    add()
    Receives an algorithm to add to the list of algorithms (Algorithm)
    */
    this.algorithms.push(algorithm);
  }
  pop() {
    /*
    pop()
    Calls pop on algorithms
    */
    return this.algorithms.pop();
  }
  length() {
    /*
    length
    Returns the number of algorithms in the box
    */
    return this.algorithms.length;
  }
  getAlgorithm() {
    /*
    getAlgorithm
    Returns a randomly selected algorithm
    */
    return this.algorithms[Math.floor(Math.random() * this.algorithms.length)];
  }
  getMinAlgorithm() {
    /*
    getMinAlgorithm
    Returns the algorithm with the minimum turnsUntilShow
    */
    let minTurns = this.algorithms[0].getTurnsUntilShow();
    let minAlg = this.algorithms[0];

    for (let alg in this.algorithms) {
      if (alg.getTurnsUntilShow() < minTurns) {
        minTurns = alg.getTurnsUntilShow();
        minAlg = alg;
      }
    }
    return minAlg;
  }
  urgentShowExists() {
    /*
    urgentShowExists
    Returns true if there is an algorithm in the box
    where turnsUntilShow <= 0
    */
    for (let i = 0; i<this.algorithms.length; i++) {
      if (this.algorithms[i].getTurnsUntilShow() <= 0) {
        return true;
      }
    }
    return false;
  }
  passRound() {
    /*
    passRound
    Subtracts 1 from every algorithms turnsUNtilShow
    */
    for (let i = 0; i<this.algorithms.length; i++) {
      this.algorithms[i].decrementTurnsUntilShow();
    }
  }

  shuffle() {
    /*
    shuffle
    Shuffles the algorithms
    Courtesy of https://stackoverflow.com/a/12646864
    */
    for (let i = this.algorithms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.algorithms[i], this.algorithms[j]] = [
        this.algorithms[j],
        this.algorithms[i],
      ];
    }
  }
}
