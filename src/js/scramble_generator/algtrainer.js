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
  pickAlg() {
    /*
    pickAlg
    Picks an algorithm to test the user on
    Returns the box and algorithm
    (box, algorithm)
    Returns -1 if there are no algs left
    */
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

  wrongAnswer() {
    /*
    wrongAnswer()
    Called after a user gets an algorithm wrong
    Resets the streak and moves to box 1
    */
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

  correctAnswer() {
    /*
    correctAnswer()
    Called after a user gets an algorithm correctly
    Increments the algorithm streak and moves it if necessary
    */
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

  ignoreAlg(alg) {
    /*
    ignoreAlg
    Moves an algorithm into the box 6 (the ignored algorithms box)
    */
    const box = this._findAlgBox(alg);
    if (box !== -1) {
      this._move(alg, box, 6);
    }
  }

  unignoreAlg(alg) {
    /*
    unignoreAlg(alg)
    Moves an algorithm from box 6 back into box 0
    */
    this._move(alg, 6, 0);
  }

  getAllAlgs(name = false, startBox = null, endBox = null) {
    /*
    getAllAlgs()
    Returns an array of all algorithms regardless of if they are ignored or not.
    If name, returns array of algorithm names instead of algs
    If box is provided an integer value, only takes algorithms from that box
    */
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

  getAlgFromName(algName) {
    /*
    getAlgFromName(algName)
    Receives the name of an algorithm
    Returns the algorithm associated with that name
    If there is no algorithm, returns -1
    */
    for (let boxIndex = 0; boxIndex < this.boxes.length; boxIndex++) {
      for (let alg = 0; alg < this.boxes[boxIndex].length(); alg++) {
        if (this.boxes[boxIndex].algorithms[alg].getName() === algName) {
          return this.boxes[boxIndex].algorithms[alg];
        }
      }
    }
    return -1;
  }

  reset() {
    /*
    reset()
    Moves all algorithms from box 5 to box 0
    Draws algorithms from box 0 to box 1
    */
    this.finished = false;
    while (this.boxes[5].length() !== 0) {
      this._move(this.boxes[5].algorithms[0], 5, 0);
    }
    this.getAlgs();
  }

  _triggerReview() {
    /*
    _triggerReview
    Returns true if a review session should be triggered
    (len box 4 == REVIEW_COUNT, box 4 is the only box with
    algorithms in it other than 4)
    */
    if (this.boxes[4].length() === REVIEW_COUNT) {
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

  _noAlgsLeft() {
    /*
    _noAlgsLeft
    Determines if there are no algorithms in boxes 0-4, implying that the user has completed the 
    learning session.
    */
    let i = 0;
    while (i < 5) {
      if (this.boxes[i].length() != 0) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  algsInCycle() {
    /*
    algsInCycle
    Finds the number of algorithms currently in boxes 1-3 (algorithm that are currently being learned)
    */
    return (
      this.boxes[1].length() + this.boxes[2].length() + this.boxes[3].length()
    );
  }

  _move(alg, startBox, endBox) {
    /*
    _move
    Receives an algorithm, the index of the box to remove it from,
    and the index of box to add it to
    */
    alg.reset(false);
    this.boxes[startBox].erase(alg);
    this.boxes[endBox].add(alg);
  }

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

  _addNewAlg() {
    /*
    _addNewAlg
    Adds a new algorithm into the rotation
    Picks from queuedAlgorithms if there are any in that box
    Else, picks one from box 0
    */
    if (this.queuedAlgs.length !== 0) {
      this.boxes[2].add(this.queuedAlgs.pop());
    } else if (this.boxes[0].length() !== 0) {
      const moveAlg = this.boxes[0].getAlgorithm();
      this._move(moveAlg, 0, 2);
    }
  }

  _removeAlg(count = 1) {
    /*
    _removeAlg
    Takes an algorithm out of cycle and adds it to queued algorithms
    Optional: receives a number of algorithms to remove
    Prefers to take an algorithm from box 2, then 1, then 3
    */
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

  _reviewSession() {
    /*
    _reviewSession
    Goes through the algorithms in box 4. Moves to box 1 if answered incorrectly,
    box 5 if answered correctly.
    */
    console.log("Review: ");
    this.curAlg = this.boxes[4].pop();
    this.curBox = 4;
  }

  _concludeReview() {
    /*
    concludeReview()
    Ends the review session by resetting
    every algorithm in incorrectAlgs and adding them
    to box 1
    */
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

  _createBoxes(algSet) {
    /*
    _createBoxes(self)
    Loads the algorithms from file_path
    Creates the boxes and fills box 2 with up to 8 algorithms
    */
    let boxes = [];
    let i = 0;
    while (i < 7) {
      let newBox = new Box();
      boxes.push(newBox);
      i += 1;
    }
    console.log(algSet);
    const WV = require(`../../assets/scrambles/${algSet}.json`);
    const scrambleInfo = WV;

    for (let algName in scrambleInfo) {
      const newAlg = new Algorithm(algName, scrambleInfo[algName]);
      boxes[0].add(newAlg);
    }
    boxes[0].shuffle();
    return boxes;
  }

  _sortByNumber(arr, name = false) {
    /*
    _sortByNumber(arr)
    Receives an array of algorithms or strings
    Sorts by string if name == true
    Returns a sorted version of an array by the trailing number
    */
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

  _sortAlphabetically(arr, name = false) {
    /*
    _sortAlphabetically(arr)
    Receives an array of algorithms or strings
    Sorts by string if name == true
    Returns an alphabetized version of the array
    */
    if (name) {
      return arr.sort((a, b) => a.localeCompare(b));
    }
    return arr.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  _containsDoubleDigitNumber(arr, names = false) {
    /*
    _getMaxNumber(arr)
    Receives an array of algorithms or strings
    Set name to true if strings
    Returns true if there is an algorithm containing a double digit number
    Used to determine whether an algorithm set can be sorted alphabetically
    */
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

  getAlgs() {
    /*
    getAlgs
    Ensures there are the proper number of algs
    in cycle
    */
    const startCount = this.algsInCycle();
    let drawCount = CONCURRENT - startCount;
    let i = 0;
    while (i < drawCount && this.boxes[0].length() !== 0) {
      this._addNewAlg();
      i += 1;
    }
  }
}
