/*
John Leeds
6/6/2022
algtrainer.py

Contains five boxes of algorithms and helps the user learn them
using an algorithm based off of the Leitner system
https://en.wikipedia.org/wiki/Leitner_system

Box 0:
    algorithms that the user has not seen yet
Box 1:
    algorithms that the user got wrong the last time they saw them
Box 2:
    algorithms that the user got correctly once or have never seen before
Box 3:
    algorithms are moved here from box 2 once they are answered 3 times in a row
Box 4:
    algorithms waiting for review
Box 5:
    algorithms that the user got correctly during review
Box 6:
    Ignored algorithms - algorithms that the user does not want to learn
*/
import Box from "./box.js";
import Algorithm from "./algorithm.js";

var CONCURRENT = 4;
var REVIEW_COUNT = 6;
// what percent of the time to pick from box 2 if there are algorithms in both box 2 and 3
var BOX_2_PERCENTAGE = 0.7;

export default class AlgTrainer {
  constructor(algSet) {
    this.boxes = this._createBoxes(algSet);
    this.queuedAlgs = [];
    this.curAlg = null;
    this.curBox = null;
    this.currentlyReviewing = false;
    this.incorrectAlgs = [];
    this.ignored = [];
    this.finished = false;
    this.getAlgs();
    // this.lastAlg = "" TODO add in this
  }

  /**
   * Tests a user on one algorithm.
   * Picks an algorithm and updates curAlg and curBox. Initiates an review session if necessary.
   * @returns {bool} True if the user has learned every algorithm.
   */
  playRound() {
    /*
    playRound
    Tests the user on one algorithm
    Returns true if the user has learned every algorithm
    */
    console.log("Box lengths: ");
    let i = 0;
    while (i < 6) {
      console.log("Box " + i + ": " + this.boxes[i].length());
      i += 1;
    }
    const info = this.pickAlg();
    console.log(info);
    this.curBox = info[0];
    this.curAlg = info[1];
    if (this.curBox == -1) {
      this.finished = true;
      return;
    }
    if (this.curBox == 4) {
      if (!this.currentlyReviewing) {
        this.boxes[4].shuffle(); // only shuffle the first time
      }
      this.currentlyReviewing = true;
      return this._reviewSession();
    }
  }

  /**
   * Selects an algorithm to test the user on.
   * First checks if there are no algorithms left and then if a review session is currently in progress.
   * After this, check for algorithms that are due to be shown after being answered incorrectly.
   * From here, attempt to select from either box 2 or 3.
   * @returns {integer[]} [box, algorithm]. Returns [-1, 0] if there are no algorithms left.
   */
  pickAlg() {
    if (this._noAlgsLeft()) {
      return [-1, 0];
    } else if (this.currentlyReviewing || this._triggerReview()) {
      return [4, 0];
    } else if (this.boxes[1].urgentShowExists()) {
      return [1, this.boxes[1].getMinAlgorithm()];
    } else if (this.boxes[2].length() !== 0 && this.boxes[3].length() === 0) {
      return [2, this.boxes[2].getAlgorithm()];
    } else if (this.boxes[3].length() !== 0 && this.boxes[2].length() === 0) {
      return [3, this.boxes[3].getAlgorithm()];
    } else if (this.boxes[2].length() === 0 && this.boxes[3].length() === 0) {
      return [1, this.boxes[1].getMinAlgorithm()];
    }
    const whichBox = Math.random();
    if (whichBox < BOX_2_PERCENTAGE) {
      return [2, this.boxes[2].getAlgorithm()];
    }
    return [3, this.boxes[3].getAlgorithm()];
  }

  /**
   * Called when a user answers an algorithm incorrectly.
   * Resets the streak and moves to box 1. Also documents the algorithm as seen.
   */
  wrongAnswer() {
    this.curAlg.seen = true;
    if (!this.currentlyReviewing) {
      this.boxes[this.curBox].erase(this.curAlg);
      this.curAlg.reset();
      this.boxes[1].add(this.curAlg);
      this.boxes[1].passRound();
    } else {
      this.incorrectAlgs.push(this.curAlg);
      if (this.boxes[4].length() === 0) {
        this._concludeReview();
      }
    }
  }

  /**
   * Called when a user answers an algorithm correctly.
   * Increments the algorithm streak and moves it if necessary. Also documents the algorithm as seen.
   */
  correctAnswer() {
    this.curAlg.seen = true;
    if (!this.currentlyReviewing) {
      const box = this.curBox;
      const alg = this.curAlg;
      alg.incrementStreak();
      if (box === 1 || box === 2) {
        alg.reset(false);
        this._move(alg, box, box + 1);
      } else if (box === 3 && alg.getStreak() === 3) {
        this._move(alg, 3, 4);
        this._addNewAlg();
      }
      this.boxes[1].passRound();
    } else {
      this._move(this.curAlg, 4, 5);
      if (this.boxes[4].length() === 0) {
        this._concludeReview();
      }
    }
  }

  /**
   * Moves an algorithm into box 6 (the ignored algorithms box).
   * @param {Algorithm} alg The algorithm to be ignored.
   */
  ignoreAlg(alg) {
    const box = this._findAlgBox(alg);
    if (box !== -1) {
      this._move(alg, box, 6);
    }
  }

  /**
   * Moves an algorithm from box 6 back into box 0.
   * @param {Algorithm} alg The algorithm to be unignored.
   */
  unignoreAlg(alg) {
    this._move(alg, 6, 0);
  }

  /**
   * Gets all algorithmsin the boxes.
   * @param   {bool}    name            (optional) True if an array of names should be returned.
   * @param   {integer} startBox        (optional) The box to start selecting algorithms from. If not specified, selects from the beginning.
   * @param   {integer} endBox          (optional) The box to end selecting algorithms at. If not specified, selects until the end.
   * @returns {Algorithm[] OR string{}} Array of all requested algorithms or algorithm names.
   */
  getAllAlgs(name = false, startBox = null, endBox = null) {
    let allAlgs = [];
    let start = 0;
    let boxCount = this.boxes.length;
    if (startBox || startBox === 0) {
      start = startBox;
      boxCount = startBox + 1;
    }
    if (endBox) {
      boxCount = endBox + 1;
    }
    for (let i = start; i < boxCount; i++) {
      for (let j = 0; j < this.boxes[i].length(); j++) {
        if (name) {
          allAlgs.push(this.boxes[i].algorithms[j].getName());
        } else {
          allAlgs.push(this.boxes[i].algorithms[j]);
        }
      }
    }
    if (this._containsDoubleDigitNumber(allAlgs, name)) {
      return this._sortByNumber(allAlgs, name);
    }
    return this._sortAlphabetically(allAlgs, name);
  }

  /**
   * Finds an algorithm with a specified name.
   * @param   {string} algName       The name of the algorithm to find.
   * @returns {Algorithm OR integer} The algorithm with the specified name (or -1 if not found).
   */
  getAlgFromName(algName) {
    for (let boxIndex = 0; boxIndex < this.boxes.length; boxIndex++) {
      for (let alg = 0; alg < this.boxes[boxIndex].length(); alg++) {
        if (this.boxes[boxIndex].algorithms[alg].getName() === algName) {
          return this.boxes[boxIndex].algorithms[alg];
        }
      }
    }
    return -1;
  }

  /**
   * Resets the alg trainer.
   * Moves all algorithms from box 5 to 0 and draws initial algs to box 1.
   */
  reset() {
    this.finished = false;
    while (this.boxes[5].length() !== 0) {
      this._move(this.boxes[5].algorithms[0], 5, 0);
    }
    this.getAlgs();
  }

  /**
   * Determines whether a review session should be triggered.
   * This occurs when the length of box 4 >= REVIEW_COUNT or box 4 is the only box with algorithms in it.
   * @returns {bool} True if a review session should be triggered; else, false
   */
  _triggerReview() {
    if (this.boxes[4].length() >= REVIEW_COUNT) {
      return true;
    }
    let i = 0;
    while (i < 4) {
      if (this.boxes[i].length() !== 0) {
        return false;
      }
      i += 1;
    }
    if (this.boxes[4].length() != 0) {
      return true;
    }
    return false;
  }

  /**
   * Determines whether there are any algorithms in boxes 0-4.
   * Used to figure out whether the user has completed the learning session.
   * @returns {bool} True if there are no algorithms left; else, false.
   */
  _noAlgsLeft() {
    let i = 0;
    while (i < 5) {
      if (this.boxes[i].length() != 0) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  /**
   * Finds the number of algorithms currently being learned.
   * These are the algorithms in boxes 1-3.
   * @returns {integer} the number of algorithms in boxes 1-3
   */
  algsInCycle() {
    /*
    algsInCycle
    Finds the number of algorithms currently in boxes 1-3 (algorithm that are currently being learned)
    */
    return (
      this.boxes[1].length() + this.boxes[2].length() + this.boxes[3].length()
    );
  }

  /**
   * Moves an algorithm from one box to another.
   * @param {Algorithm} alg      The algorithm to move.
   * @param {integer}   startBox The box to move the algorithm from.
   * @param {integer}   endBox   The box to move the algorithm to.
   */
  _move(alg, startBox, endBox) {
    alg.reset(false);
    if (!alg.seen) {
      alg.streak = 2;
    }
    if (endBox === 6) {
      this.seen = false;
    }
    this.boxes[startBox].erase(alg);
    this.boxes[endBox].add(alg);
  }

  /**
   * Finds the box containing a specified algorithm.
   * @param   {Algorithm} alg The algorithm to search for.
   * @returns {integer}       The box containing the specified algorithm. Returns -1 if the algorithm is not found.
   */
  _findAlgBox(alg) {
    /*
    _findAlgbox
    Returns the box that an algorithm is in
    Returns -1 if the algorithm is not found
    */
    for (let box = 0; box < 7; box++) {
      if (this.boxes[box].exists(alg)) {
        return box;
      }
    }
    return -1;
  }

  /**
   * Adds a new algorithm into the cycle.
   * Picks from queuedAlgorithms if there are any algorithms in that box. Else, selects from box 0.
   */
  _addNewAlg() {
    if (this.queuedAlgs.length !== 0) {
      this.boxes[2].add(this.queuedAlgs.pop());
    } else if (this.boxes[0].length() !== 0) {
      const moveAlg = this.boxes[0].getAlgorithm();
      this._move(moveAlg, 0, 3);
    }
  }

  /**
   * Removes algorithms from the cycle and adds it to the queued algorithms.
   * Prefers to take algorithms from box 2, then 1, then 3.
   * @param {integer} count (optional) How many algorithms to remove - defaults to 1.
   */
  _removeAlg(count = 1) {
    let c = 0;
    while (c < count) {
      const boxPreference = [2, 1, 3];
      for (let i = 0; i < 3; i++) {
        if (this.boxes[boxPreference[i]].length() !== 0) {
          this.queuedAlgs.unshift(this.boxes[boxPreference[i]].pop());
          break;
        }
      }
      c += 1;
    }
  }

  /**
   * Simulates a review session.
   * Shows every algorithm in box 4 and moves it to either box 5 or box 1 depending on whether the user answers correctly.
   */
  _reviewSession() {
    console.log("Review: ");
    this.curAlg = this.boxes[4].pop();
    this.curBox = 4;
  }

  /**
   * Ends the review session.
   * Resets every algorithm in incorrectAlgs and adds them to box 1.
   */
  _concludeReview() {
    console.log("Concluding");
    this.currentlyReviewing = false;
    const curInCycle = this.algsInCycle();
    const removeCount = curInCycle - (CONCURRENT - this.incorrectAlgs.length);
    this._removeAlg(removeCount);

    for (let i = 0; i < this.incorrectAlgs.length; i++) {
      this.incorrectAlgs[i].reset();
      this.boxes[1].add(this.incorrectAlgs[i]);
    }
    this.incorrectAlgs = [];
  }

  /**
   * Creates the boxes
   * Loads algorithms and fills box 2 with up to CONCURRENT algorithms.
   * @param   {string} algSet The name of the algorithm set.
   * @returns {Box[]}         The initial boxes.
   */
  _createBoxes(algSet) {
    let boxes = [];
    let i = 0;
    while (i < 7) {
      let newBox = new Box();
      boxes.push(newBox);
      i += 1;
    }
    const algs = require(`../../assets/scrambles/${algSet}.json`);
    const scrambleInfo = algs;
    const solutions = require(`../../assets/solutions/${algSet}.json`);
    // console.log(`SOLUTION: ${solutions}`);
    console.log(solutions);

    for (let algName in scrambleInfo) {
      const newAlg = new Algorithm(algName, scrambleInfo[algName], solutions[algName]);
      boxes[0].add(newAlg);
    }
    boxes[0].shuffle();
    return boxes;
  }

  /**
   * Sorts an array by the last 2 trailing numbers.
   * @param   {Algorithm[] OR string[]} arr  The array to sort
   * @param   {bool}                    name True if it is an array of strings; else, false.
   * @returns {Algorithm[] OR string[]}      The sorted array.
   */
  _sortByNumber(arr, name = false) {
    return arr.sort((a, b) => {
      if (!name) {
        a = a.getName();
        b = b.getName();
      }
      const aNum = parseInt(a.substring(a.length - 2).trim());
      const bNum = parseInt(b.substring(b.length - 2).trim());
      return aNum - bNum;
    });
  }

  /**
   * Sorts an array alphabetically.
   * @param   {Algorithm[] OR string[]} arr  The array to sort
   * @param   {bool}                    name True if it is an array of strings; else, false.
   * @returns {Algorithm[] OR string[]}      The sorted array.
   */
  _sortAlphabetically(arr, name = false) {
    if (name) {
      return arr.sort((a, b) => a.localeCompare(b));
    }
    return arr.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * Determines if the array contains a double digit algorithm.
   * Used to determine whether the array should be sorted alphabetically or by number.
   * @param   {Algorithm[] OR string[]} arr  The array to sort
   * @param   {bool}                    name True if it is an array of strings; else, false.
   * @returns {bool}                         True if the array contains a double digit number; else, false.
   */
  _containsDoubleDigitNumber(arr, names = false) {
    for (let i = 0; i < arr.length; i++) {
      let name;
      if (names) {
        name = arr[i].slice(-2);
      } else {
        name = arr[i].getName().slice(-2);
      }
      if (!isNaN(name) && name.slice(0, 1) !== " ") {
        return true;
      }
    }
    return false;
  }

  /**
   * Adds algorithms to the cycle if necessary.
   * Maintains that CONCURRENT algorithms are always in cycle.
   */
  getAlgs() {
    const startCount = this.algsInCycle();
    let drawCount = CONCURRENT - startCount;
    let i = 0;
    while (i < drawCount && this.boxes[0].length() !== 0) {
      this._addNewAlg();
      i += 1;
    }
  }
}
