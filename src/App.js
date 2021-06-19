import { useState } from 'react';
import './App.css';
import { quotes } from './quotes.json';
import useSound from 'use-sound';
import typingSound from './typingSound.wav';
import blipSound from './blipSound.wav';
import completeSound from './completeSound.wav';

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
  const [playTypeSound] = useSound(typingSound, { volume: 0.25 });
  const [playErrorSound] = useSound(blipSound, { volume: 0.25 });
  const [playCompleteSound] = useSound(completeSound, { volume: 0.25 });

  const [currentText, setCurrentText] = useState('');
  const [pressedKey, setPressedKey] = useState('');
  const [textToEnter, setTextToEnter] = useState("Type this text including spaces. Pay attention to case!");

  document.onkeypress = handleKeyPress;

  function handleKeyPress(e) {

    setPressedKey(e.key);
    var letterToEnter = textToEnter.charAt(currentIndex);

    if (e.key === letterToEnter) {
      playTypeSound();
      PlayAnimation("keyPressAnimClass", "pressedKey");
      setCurrentText(currentText + e.key);
      currentIndex++;
      if (currentIndex >= textToEnter.length) {
        playCompleteSound();
        // Display stats
        // var finishTime = (new Date().getTime() - startTime) / 1000;
        // alert("Time taken: " + finishTime + " seconds");

        // Setup next "game"
        setTextToEnter(GetRandomQuote());
        setCurrentText("");
        currentIndex = 0;
      }
    }
    else {
      PlayAnimation("shakeAnimClass", "pressedKey");
      playErrorSound();
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
