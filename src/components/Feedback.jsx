import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { Btn } from "./Btn"

export const Feedback = () => {
  const { gameState, setGameState } = useContext(GameContext)
  const {
    widthGuesses,
    heightGuesses,
    targetHeights,
    targetWidths,
    round,
  } = gameState
  const curr = round - 1

  const nextRound = () => {
    setGameState((prev) => ({
      ...prev,
      guessed: false,
      round: prev.round + 1,
    }))
    console.log(gameState)
  }

  return (
    <div className="feedback">
      <div className="feedback--stats">
        <h1>Good job! Close!</h1>
        <p>
          You were off by <span>169</span>
        </p>
        <div style={{ display: "flex", gap: "2em" }}>
          <p>Width: {widthGuesses[curr]} px (+88)</p>
          <p>Height: {heightGuesses[curr]} px (-18)</p>
        </div>
        <Btn handleClick={() => nextRound()}>Next round</Btn>
      </div>
    </div>
  )
}
