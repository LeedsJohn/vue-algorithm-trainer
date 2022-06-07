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

class AlgTrainer {
  constructor(file_path) {
    this.boxes = this._createBoxes(file_path);
    this._initialAlgs();
    this.queuedAlgs = [];
    // self.lastAlg = "" TODO add in this
  }
  playRound() {
    /*
    playRound
    Tests the user on one algorithm
    Returns True if the user has learned every algorithm
    */
    console.log("Box lengths: ");
    let i = 0;
    for (let box in this.boxes) {
      console.log("Box " + i + ": " + box.length());
    }
    const info = self.pickAlg();
    const box = info[0];
    const alg = info[1];
    if (box == -1) {
      return True;
    }
    if (box == 4) {
      return self._reviewSession();
    }
    console.log(alg.getScramble());
    const incorrect = window.prompt("uhhhh");
    if (incorrect === "X") {
      return True;
    }
    if (incorrect) {
      this.boxes[box].erase(alg);
      alg.reset();
      this.boxes[1].add(alg);
    } else {
      alg.incrementStreak();
      if (box === 1 || box === 2) {
        alg.reset((wrongAns = False));
        this._move(alg, box, box + 1);
      } else if (box === 3 && alg.getStreak() === 3) {
        this._move(alg, 3, 4);
        this._addNewAlg();
      }
    }
    this.boxes[1].passRound();
  }
  pickAlg() {
    /*
    pickAlg
    Picks an algorithm to test the user on
    Returns the box and algorithm
    (box, algorithm)
    */
    if (self._noAlgsLeft()) {
      return [-1, 0];
    } else if (self._triggerReview()) {
      return [4, 0];
    } else if (this.boxes[1].urgentShowExists()) {
      return [1, self.boxes[1].getMinAlgorithm()];
    } else if (self.boxes[2].length() !== 0 && self.boxes[3].length() === 0) {
      return [2, self.boxes[2].getAlgorithm()];
    } else if (self.boxes[3].length() !== 0 && self.boxes[2].length() === 0) {
      return [3, self.boxes[3].getAlgorithm()];
    } else if (self.boxes[2].length() === 0 && self.boxes[3].length() === 0) {
      return 1, self.boxes[1].getMinAlgorithm();
    }
    const whichBox = Math.random();
    if (whichBox < BOX_2_PERCENTAGE) {
      return [2, self.boxes[2].getAlgorithm()];
    }
    return [3, self.boxes[3].getAlgorithm()];
  }

  _triggerReview() {
    /*
    _triggerReview
    Returns true if a review session should be triggered
    (len box 4 == REVIEW_COUNT, box 4 is the only box with
    algorithms in it other than 4)
    */
    if (this.boxes[4].length() === REVIEW_COUNT) {
      return True;
    }
    let i = 0;
    while (i < 4) {
      if (this.boxes[i].length() !== 0) {
        return False;
      }
      i += 1;
    }
    if (self.boxes[4].length() != 0) {
      return True;
    }
    return False;
  }

  _noAlgsLeft() {
    /*
    _noAlgsLeft
    Determines if there are no algorithms in boxes 0-4, implying that the user has completed the 
    learning session.
    */
    let i = 0;
    while (i < 5) {
      if (self.boxes[i].length() != 0) {
        return False;
      }
      i += 1;
    }
    return True;
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
    alg.reset((wrongAns = False));
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
    if (this.queuedAlgs) {
      this.boxes[2].add(self.queuedAlgs.pop());
    } else if (self.boxes[0].length() !== 0) {
      this._move(self.boxes[0].getAlgorithm(), 0, 2);
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
      alg = this.boxes[4].pop();
      console.log(alg.getScramble());
      incorrect = window.prompt(
        "Enter any character if you got the algorithm wrong: "
      );
      if (incorrect === "X") {
        return True;
      }
      if (incorrect) {
        incorrectAlgs.push(alg);
      } else {
        this._move(alg, 4, 5);
      }
    }
    this._removeAlg(incorrectAlgs.length);

    for (let alg in incorrectAlgs) {
      alg.reset();
      self.boxes[1].add(alg);
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

    const scrambleInfo = require(file_path);

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
    }
  }
}
