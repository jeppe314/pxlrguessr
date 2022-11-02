import React, { useEffect, useContext, useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { GameContext } from "../contexts/GameContext"
import { nanoid } from "nanoid"

export const HighScore = () => {
  const { gameState } = useContext(GameContext)
  const [highscores, setHighscores] = useState({})

  useEffect(() => {
    const getScores = async () => {
      const usersRef = doc(db, "scores", "users")
      const docSnap = await getDoc(usersRef)
      try {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data())
          setHighscores(docSnap.data())
        } else {
          console.log("No such document!")
        }
      } catch (err) {
        console.log("error" + err)
      }
    }
    getScores()
  }, [])

  const sorted = highscores.scores?.sort((a, b) => {
    return a.score - b.score
  })

  const listEl = sorted?.map((user) => {
    return (
      <li key={nanoid()} className="highscore--item">
        <p className="highscore--name">
          {highscores.scores.indexOf(user) + 1}. {user.name}
        </p>
        <div className="dots"></div>
        <p className="highscore--score">{user.score}</p>
      </li>
    )
  })

  return (
    <div className="highscore">
      <h1>High Scores</h1>
      <h2>Top 100</h2>
      <ul className="highscore--list">{listEl}</ul>
    </div>
  )
}