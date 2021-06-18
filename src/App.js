import { useState } from 'react';
import './App.css';
import { quotes } from './quotes.json';

var currentIndex = 0; // index of the text we need to enter


function GetRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)].quote;
}

function PlayAnimation(animClass, elementID) {
  var el = document.getElementById(elementID);
  el.classList.remove(animClass);
  void el.offsetWidth;
  el.classList.add(animClass);
}

function App() {
  //var startTime = new Date();

  const [currentText, setCurrentText] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [textToEnter, setTextToEnter] = useState("Type this text including spaces, pay attention to case!"); 

  document.onkeypress = handleKeyPress;

  function handleKeyPress(e) {
    setPressedKey(e.key);
    var letterToEnter = textToEnter.charAt(currentIndex);

    if (e.key === letterToEnter) {

      PlayAnimation("keyPressAnimClass", "pressedKey");
      setCurrentText(currentText + e.key);
      currentIndex++;
      if (currentIndex >= textToEnter.length) {

        // Display stats
        // var finishTime = (new Date().getTime() - startTime) / 1000;
        // alert("Time taken: " + finishTime + " seconds");

        // Reset game
        setTextToEnter(GetRandomQuote());
        setCurrentText("");
        currentIndex = 0;
      }
    }
    else {
      PlayAnimation("shakeAnimClass", "pressedKey");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="Title">Simple Typing Game</h3>
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
