import { useState } from 'react';
import './App.css';
import {quotes} from './quotes.json';

//var textToEnter = 'Enter this text!';
var currentIndex = 0; // index of the text we need to enter

function App() {
  const [currentText, setCurrentText] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [textToEnter, setTextToEnter] = useState(quotes[Math.floor(Math.random()*quotes.length)].quote);

  document.onkeypress = handleKeyPress;

  function handleKeyPress(e) {
    setPressedKey(e.key);
    var letterToEnter = textToEnter.charAt(currentIndex);
    console.log("letterToEnter: " + letterToEnter);
    var el = document.getElementById("pressedKey");
    el.classList.remove("keyPressAnimClass");
    void el.offsetWidth;
    el.classList.add("keyPressAnimClass");

    if (e.key === letterToEnter) {
      setCurrentText(currentText + e.key);
      currentIndex++;
      console.log("currentIndex =" + currentIndex);
      if (currentIndex >= textToEnter.length) {
        alert("You win!");
        console.log("Completed!");
        setTextToEnter(quotes[Math.floor(Math.random()*quotes.length)].quote);
        currentIndex = 0;
      }
    }
    else {
      console.log(e.key + " incorrect key entered!");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Typing Game!</h3>
        <p id="textToEnter">
          {textToEnter}
        </p>

        <p className="currentText">
          {currentText}
        </p>
        
        <h2 id="pressedKey" className="pressedKey">{pressedKey}</h2>

      </header>
    </div>
  );
}

export default App;
