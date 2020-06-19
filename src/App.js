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
      <h1>AutoCompleteInput</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <AutoCompleteInput
          value={inputText}
          initOptions={fruitOptions}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="Select a fruit…"
        />
      </form>
    </div>
  );
}

export default App;
