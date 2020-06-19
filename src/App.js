import React, { useState } from "react";
import AutoCompleteInput from "./components/AutoCompleteInput";
import "sanitize.css";
import "./App.css";
import fruits from "./fruits.json";

const fruitOptions = [...new Set(fruits)];

function App() {
  const [inputText, setInputText] = useState("");
  const [fruit, setFruit] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setFruit(inputText);
  }

  function handleChange(event) {
    setInputText(event.target.value);
    setFruit("");
  }

  return (
    <div className="App">
      <h1>AutoCompleteInput</h1>
      <form onSubmit={handleSubmit}>
        <AutoCompleteInput
          value={inputText}
          initOptions={fruitOptions}
          onChange={handleChange}
          placeholder="Select a fruit…"
        />
        <button type="submit">Submit</button>
      </form>
      {fruit && (
        <p>
          You have selected: <b>{fruit}</b>!
        </p>
      )}
    </div>
  );
}

export default App;
