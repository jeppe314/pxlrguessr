import React, { createContext, useEffect, useState } from "react"
import { feedbackQuotes } from "../assets/quotes"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { nanoid } from "nanoid"

export const GameContext = createContext()
export const GameContextProvider = ({ children }) => {
  const [err, setErr] = useState(false)

  const [gameState, setGameState] = useState({
    uid: nanoid(),
    name: "",
    finished: false,
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

  const { guessed, finished, uid, score, name, round } = gameState

  const [start, setStart] = useState(false)
  const [mouseDown, setMouseDown] = useState(false)
  const [rect, setRect] = useState({})

  function randomIntFromInterval(min, max, n) {
    const arr = []
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return arr
  }
  const [boxStyles, setBoxStyles] = useState({})

  const curr = gameState.round - 1

  const startGame = async () => {
    if (name.length < 3) {
      console.log("error")
      setErr(true)
      return
    }

    setGameState((prev) => ({
      ...prev,
      started: true,
    }))
  }

  const startPos = (e) => {
    if (!guessed) {
      setMouseDown(true)
      const el = e.target.getBoundingClientRect()

      setRect({
        left: e.clientX,
        top: e.clientY,
        initialTop: e.clientY - el.top,
      })

      setBoxStyles({
        width: "0px",
        height: "0px",
        left: e.clientX,
        top: e.clientY - el.top,
      })
    } else return
  }
  const boxMove = (e) => {
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    if (mouseDown) {
      setBoxStyles({
        top:
          relY >= 0
            ? rect.initialTop
            : rect.initialTop - Math.abs(relY),
        left:
          relX >= 0
            ? e.clientX - relX
            : e.clientX - relX - Math.abs(relX),
        width: Math.abs(relX),
        height: Math.abs(relY),
      })
    } else return
  }
  //FIXME

  const boxGuess = () => {
    setMouseDown(false)
    if (!guessed && boxStyles.width > 0 && boxStyles.height > 0) {
      setGameState((prev) => ({
        ...prev,
        guessed: true,
        widthGuesses: [...prev.widthGuesses, boxStyles.width],
        heightGuesses: [...prev.heightGuesses, boxStyles.height],
      }))
    }
    console.log(gameState.finished)
    console.log(gameState.round)
  }

  const nextRound = async () => {
    //Resets gameState for a new round
    setGameState((prev) => ({
      ...prev,
      started: prev.finished ? false : true,
      guessed: false,
      round: prev.round + 1,
      finished: prev.round === 4 ? true : false,
    }))

    //Resets guess box
    setBoxStyles((prev) => ({
      ...prev,
      width: 0,
      height: 0,
    }))
    //Upload score to firestore
    if (finished) {
      console.log("FINISHED")
      try {
        await setDoc(doc(db, "scores", uid), {
          name: name,
          score: score,
        })
        console.log("TEST")
      } catch (err) {
        console.log(err)
      }
    }
  }

  const playAgain = () => {
    setGameState((prev) => ({
      ...prev,
      started: true,
      finished: false,
      round: 1,
      score: 0,
      roundScores: [],
      targetHeights: randomIntFromInterval(20, 400, 5),
      targetWidths: randomIntFromInterval(20, 400, 5),
      widthGuesses: [],
      heightGuesses: [],
      widthDiff: [],
      heightDiff: [],
    }))
  }

  return (
    <GameContext.Provider
      value={{
        startGame,
        gameState,
        setGameState,
        start,
        setStart,
        curr,
        playAgain,
        nextRound,
        boxStyles,
        setBoxStyles,
        startPos,
        boxMove,
        boxGuess,
        feedbackQuotes,
        err,
        setErr,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
