import React, { createContext, useState } from "react"

export const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
  const [start, setStart] = useState(false)

  function randomIntFromInterval(min, max, n) {
    const arr = []
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return arr
  }

  function sumArr(arr) {
    arr.reduce((partialSum, a) => partialSum + a, 0)
  }

  const [gameState, setGameState] = useState({
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
  })

  const curr = gameState.round - 1

  return (
    <GameContext.Provider
      value={{ gameState, setGameState, start, setStart, curr }}
    >
      {children}
    </GameContext.Provider>
  )
}
