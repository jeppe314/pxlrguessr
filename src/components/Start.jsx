import React, { useContext } from "react"
import { Btn } from "./Btn"
import { GameContext } from "../contexts/GameContext"
import "./../floatingBg.scss"
import { FloatingShapes } from "./FloatingShapes"

export const Start = () => {
  const { setGameState, err, startGame } = useContext(GameContext)

  return (
    <div className="start">
      <FloatingShapes>
        <div className="start--content">
          <p className="start--content--text">
            Welcome to PxlGuessr.
            <br />
            Call yourself a <i>web developer</i>?
            <br />
            Ok then, how big is a pixel? You should know this.
            <br />
            Draw a box that fits the dimensions given from the game.
            The lower the score, the better.
            <br />
            You can do this, right?
          </p>
          <Btn handleClick={(e) => startGame(e)}>Start Game</Btn>
          <input
            type="text"
            className="name--input"
            placeholder="NAME"
            onChange={(e) =>
              setGameState((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          ></input>
          {err && (
            <p style={{ color: "red" }}>Tell me your name first!</p>
          )}
        </div>
      </FloatingShapes>
    </div>
  )
}
