import React from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import "sanitize.css";
import "./App.css";
import fruits from "./fruits.json";

const fruitOptions = [...new Set(fruits)];

function App() {
  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="input-choice"></label>
        <br />
        <AutoCompleteInput initOptions={fruitOptions} />
      </form>
    </div>
  );
}

export default App;
