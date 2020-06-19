import React, { useState } from "react";
import AutoCompleteInput from "./components/AutoCompleteInput";
import "sanitize.css";
import "./App.css";
import fruits from "./fruits.json";

const fruitOptions = [...new Set(fruits)];

function App() {
  const [inputText, setInputText] = useState("");
  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="input-choice">Fruit Selection</label>
        <AutoCompleteInput
          value={inputText}
          initOptions={fruitOptions}
          onChange={(event) => setInputText(event.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
