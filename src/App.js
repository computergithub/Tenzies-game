import './App.css';
import Die from "./Die"
import React from "react";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
function App() {

  const [dice, setDice] = React.useState(newAllDie())
  const [Tenzies, setTenzies] = React.useState(false)


  React.useEffect(() => {
    const allDie = dice.every(die => die.isHeld)
    const firstValue = dice[0].values
    const allSameValue = dice.every(die => die.values === firstValue)
    if (allDie && allSameValue) {
      setTenzies(true)
      console.log("youWin")
    }
  }, [dice])
  function generateNewDie() {
    return {
      values: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()
    }
  }
  function newAllDie() {
    const allDie = []
    for (let i = 1; i <= 10; i++) {
      allDie.push(generateNewDie())

    }
    return allDie
  }   
  function holdDie(id) {
    setDice(oldDie => oldDie.map(die => {
      return die.id === id ? {
        ...die, isHeld: !die.isHeld
      } : die
    }))
  }
  function changeDie() {
    if (!Tenzies) {
      
      setDice(oldDie => oldDie.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(newAllDie())
    }
  }
  newAllDie()
  const diceElement = dice.map(die => <Die key={die.id} values={die.values} isHeld={die.isHeld} holdDie={() => { holdDie(die.id) }} />)
  return (

    <main>
      {Tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
        <button className="roll-dice" onClick={changeDie}> {Tenzies ? "New Roll" : "Roll"}</button>
      </div>
    </main>
  );
}

export default App;
