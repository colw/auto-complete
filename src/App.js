import React from "react";
import FormContainer from "./FormContainer";
import "sanitize.css";
import "./App.css";
import fruits from "./fruits.json";

const fruitOptions = [...new Set(fruits)];

function App() {
  return (
    <div className="App">
      <FormContainer initOptions={fruitOptions} />
    </div>
  );
}

export default App;
