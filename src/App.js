import { useState } from 'react';
import './App.css';

var textToEnter = 'Enter this text!';
var currentIndex = 0; // index of the text we need to enter

function App() {
  const [currentText, setCurrentText] = useState('');
  const [pressedKey, setPressedKey] = useState('');

  document.onkeypress = handleKeyPress;

  function handleKeyPress(e) {
    setPressedKey(e.key);
    var letterToEnter = textToEnter.charAt(currentIndex);


    if (e.key === letterToEnter) {
      setCurrentText(currentText + e.key);
      currentIndex = currentIndex + 1;
      console.log("currentIndex =" + currentIndex);
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

        <h2>Your text: </h2>
        <p className="currentText">
          {currentText}
        </p>

        <h2>{pressedKey}</h2> 

      </header>
    </div>
  );
}

export default App;
