import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])
  
  function getNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(getNewDice())
      }
      return newDice
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
    } else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : getNewDice()
      }))
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id 
        ? {...die, isHeld: !die.isHeld}
        : die
    }))
  }
    
  const diceElements = dice.map(die => <Die 
    key={die.id}
    value={die.value}
    isHeld={die.isHeld} 
    holdDice={() => holdDice(die.id)}
  />)
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="container">
        {diceElements}
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App;
