import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Die from './Die';
import './style.css';

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function allNewDice() {
    let newDice = [];
    for (let i=0; i<10; i++) {
      newDice.push({
        value: Math.ceil((Math.random() * 6)), 
        isHeld: false,
        id: nanoid()
      })      
    }

    return newDice;
  }

  useEffect(() => {
    let condi = true;
    for (let i=0; i < dice.length; i++) {
      if (dice[i].isHeld === false) {
        condi = false;
      }
    }

    if (condi) {
      setTenzies(true)
    }
  }, [dice])
  const diceElements = dice.map(die => <Die 
    key={die.id}
    value={die.value} 
    isheld={die.isHeld} 
    holdDice={() => holdDice(die.id)}
    />)

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
    }
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld === false ?
        {
          value: Math.ceil((Math.random() * 6)), 
          isHeld: false,
          id: nanoid()
        } :
        die
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld:!die.isHeld} :
        die
    }))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className='roll-dice' 
        onClick={rollDice} 
        >{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
