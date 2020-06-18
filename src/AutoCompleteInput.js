import React, { useState, useRef } from "react";

function splitTextOn(text, highlightText) {
  const position = text.toLowerCase().indexOf(highlightText.toLowerCase());
  if (position === -1) {
    return [text];
  } else {
    return [
      text.slice(0, position),
      highlightText,
      text.slice(position + highlightText.length),
    ];
  }
}

function HighlightedText({ text, highlightText }) {
  const [start, highlighted, end] = splitTextOn(text, highlightText);
  return (
    <span>
      {start}
      {highlighted && <span className="highlighted-text">{highlighted}</span>}
      {end}
    </span>
  );
}

function OptionList({ curInput, options, onClick, selected, containerRef }) {
  return (
    <ul className="autocomplete-options" ref={containerRef}>
      {options.map((text, index) => (
        <li
          key={text}
          onClick={() => onClick(text)}
          className={index === selected ? "selected" : ""}
        >
          <HighlightedText text={text} highlightText={curInput} />
        </li>
      ))}
    </ul>
  );
}

const KEY_ENTER = 13;
const KEY_UP = 38;
const KEY_DOWN = 40;

function FormContainer({ initOptions = [] }) {
  const [inputText, setInputText] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const listRef = useRef(null);

  function selectItem(text) {
    setInputText(text);
    setShowOptions(false);
  }

  function handleKeyDown(event) {
    console.log(listRef && listRef.current);
    console.log(listRef && listRef.current && listRef.current.scrollTop);
    if (event.keyCode === KEY_UP) {
      if (selectedItemIndex > 0) {
        setSelectedItemIndex(selectedItemIndex - 1);
      }
    } else if (event.keyCode === KEY_DOWN) {
      if (selectedItemIndex < filteredOptions.length - 1) {
        setSelectedItemIndex(selectedItemIndex + 1);
      }
    } else if (event.keyCode === KEY_ENTER) {
      const selectedItemText = filteredOptions[selectedItemIndex];
      selectItem(selectedItemText);
    }
  }

  function handleTextChange(value) {
    setInputText(value);
    setShowOptions(true);
    const newFilteredOptions = initOptions.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setFilteredOptions(newFilteredOptions);
    setSelectedItemIndex(0);
  }

  return (
    <div className="autocomplete" onKeyDown={handleKeyDown}>
      <input
        autoComplete="off"
        id="input-choice"
        name="input-choice"
        onChange={(event) => handleTextChange(event.target.value)}
        value={inputText}
        type="text"
      />
      {showOptions && (
        <OptionList
          curInput={inputText}
          options={filteredOptions}
          onClick={selectItem}
          selected={selectedItemIndex}
          containerRef={listRef}
        />
      )}
    </div>
  );
}

export default FormContainer;
