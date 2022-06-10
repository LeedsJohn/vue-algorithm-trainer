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
*/
import Box from "./box.js";
import Algorithm from "./algorithm.js";

var CONCURRENT = 4;
var REVIEW_COUNT = 8;
// what percent of the time to pick from box 2 if there are algorithms in both box 2 and 3
var BOX_2_PERCENTAGE = 0.7;

export default class AlgTrainer {
  constructor(file_path) {
    this.boxes = this._createBoxes(file_path);
    this._initialAlgs();
    this.queuedAlgs = [];
    this.curAlg = null;
    this.curBox = null;
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
      return true;
    }
    if (this.curBox == 4) {
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
    } else if (this._triggerReview()) {
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
    this.boxes[this.curBox].erase(this.curAlg);
    this.curAlg.reset();
    this.boxes[1].add(this.curAlg);
    this.boxes[1].passRound();
  }

  correctAnswer() {
    /*
    correctAnswer()
    Called after a user gets an algorithm correctly
    Increments the algorithm streak and moves it if necessary
    */
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

  _algsInCycle() {
    /*
    _algsInCycle
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
      for (let i in [2, 1, 3]) {
        if (this.boxes[i].length() !== 0) {
          this.queuedAlgs.append(this.boxes[i].pop());
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
    this.boxes[4].shuffle();
    let incorrectAlgs = [];
    while (this.boxes[4].length() !== 0) {
      const alg = this.boxes[4].pop();
      this.curBox = 4;
      this.curAlg = alg;
      const incorrect = window.prompt(
        "Enter any character if you got the algorithm wrong: "
      );
      if (incorrect === "X") {
        return true;
      }
      if (incorrect) {
        incorrectAlgs.push(alg);
      } else {
        this._move(alg, 4, 5);
      }
    }
    this._removeAlg(incorrectAlgs.length);

    for (let i = 0; i < incorrectAlgs.length; i++) {
      incorrectAlgs[i].reset();
      this.boxes[1].add(incorrectAlgs[i]);
    }
  }

  _createBoxes(file_path) {
    /*
    _createBoxes(self)
    Loads the algorithms from file_path
    Creates the boxes and fills box 2 with up to 8 algorithms
    */
    let boxes = [];
    let i = 0;
    while (i < 6) {
      let newBox = new Box();
      boxes.push(newBox);
      i += 1;
    }
    console.log(file_path);
    const { WV } = require("../../assets/scrambles/WV.js");
    // console.log(file_path);
    // const { WV } = require("../../assets/scrambles/WV.js");
    const scrambleInfo = WV;

    for (let algName in scrambleInfo) {
      const newAlg = new Algorithm(algName, scrambleInfo[algName]);
      boxes[0].add(newAlg);
    }
    boxes[0].shuffle();
    return boxes;
  }

  _initialAlgs() {
    /*
    _initialAlgs
    Picks the initial algorithms.
    Chooses up to CONCURRENT algorithms to move from box 0 to box 2
    */
    let minCount = CONCURRENT;
    if (this.boxes[0].length() < minCount) {
      minCount = this.boxes[0].length();
    }
    let i = 0;
    while (i < minCount) {
      this._move(this.boxes[0].getAlgorithm(), 0, 2);
      i += 1;
    }
  }
}
