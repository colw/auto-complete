import React, { useState } from "react";
import AutoCompleteInput from "./components/AutoCompleteInput";
import "sanitize.css";
import "./App.css";
import fruits from "./fruits.json";

const fruitOptions = [...new Set(fruits)]; // Remove duplicates

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
          options={fruitOptions}
          onChange={handleChange}
          placeholder="Enter a fruit…"
        />
        <button type="submit">Submit</button>
      </form>
      {fruit && (
        <p>
          You have entered: <b>{fruit}</b>!
        </p>
      )}
    </div>
  );
}

export default App;
