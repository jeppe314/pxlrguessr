import { nanoid } from "nanoid"

export const INITIAL_STATE = {
  uid: nanoid(),
  name: "",
  finished: false,
  showPost: false,
  started: false,
  guessed: false,
  gameLength: 5,
  round: 1,
  targetHeights: randomIntFromInterval(20, 400, 5),
  targetWidths: randomIntFromInterval(20, 400, 5),
  widthGuesses: [],
  heightGuesses: [],
  widthDiff: [],
  heightDiff: [],
  roundScores: [],
  score: 0,
  boxStyles: {},
  targetBoxStyles: {},
  err: false,
  mouseDown: false,
  rect: {},
  loading: false,
  showModal: false,
}

export const gameReducer = (state, action) {
    switch (action.type) {
        case "START_GAME":
            return {
                
            }
    }
}