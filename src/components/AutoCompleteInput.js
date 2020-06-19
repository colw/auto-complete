import React, { useState, useRef } from "react";
import { splitTextOn, indexOfIgnoreAccent } from "../utils/StringTools";

import "./AutoCompleteInput.css";

/* 
  Return a span text element such that an inner portion of
  the text is wrapped in a span tag.
*/
function HighlightedText({ text, highlightText }) {
  const [start, highlighted, end] = splitTextOn(text, highlightText);
  return (
    <span className="text-item">
      {start}
      {highlighted && <span className="highlighted-text">{highlighted}</span>}
      {end}
    </span>
  );
}

/*
  Construct a list of items that can each be clicked and/or selected.
*/
function OptionList({ curInput, options, onClick, selected, listRef }) {
  return (
    <ul className="autocomplete-options" ref={listRef}>
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

const KEY_CODE = {
  ENTER: 13,
  UP: 38,
  DOWN: 40,
  ESC: 27,
};

/*
  An input component with an autocompletion suggestion box.
*/
function AutoCompleteInput({
  value = "",
  initOptions = [],
  onChange,
  placeholder,
}) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const listRef = useRef(null); // TODO: Use this ref to set scroll position

  // Let parent know a change happened, and hide the options.
  function selectItem(text) {
    onChange({ target: { value: text } });
    setShowOptions(false);
  }

  // Handle Up, Down, Enter and Escape keys.
  function handleKeyDown(event) {
    if (event.keyCode === KEY_CODE.UP) {
      if (selectedItemIndex > 0) {
        setSelectedItemIndex(selectedItemIndex - 1);
      }
    } else if (event.keyCode === KEY_CODE.DOWN) {
      if (selectedItemIndex < filteredOptions.length - 1) {
        setSelectedItemIndex(selectedItemIndex + 1);
      }
    } else if (event.keyCode === KEY_CODE.ENTER) {
      if (selectedItemIndex >= 0 && filteredOptions.length > 0) {
        const selectedItemText = filteredOptions[selectedItemIndex];
        selectItem(selectedItemText);
      }
    } else if (event.keyCode === KEY_CODE.ESC) {
      setShowOptions(false);
    }
  }

  // When text changes we need to filter the option list and display options if any
  // Then the parent onChange event is called to update the text.
  function handleTextChange(event) {
    const value = event.target.value;
    const newFilteredOptions = initOptions.filter((option) => {
      const matches = indexOfIgnoreAccent(option, value);
      return matches !== -1;
    });
    setFilteredOptions(newFilteredOptions);
    if (newFilteredOptions.length === 0) {
      setSelectedItemIndex(-1); // Reset to -1 when there is nothing to select.
    } else {
      setSelectedItemIndex(0);
    }
    setShowOptions(true);
    onChange(event);
  }

  return (
    <div className="autocomplete" onKeyDown={handleKeyDown}>
      <input
        autoFocus
        autoComplete="off"
        id="input-choice"
        name="input-choice"
        onChange={handleTextChange}
        value={value}
        type="text"
        placeholder={placeholder}
      />
      {showOptions && filteredOptions.length > 0 && (
        <OptionList
          curInput={value}
          options={filteredOptions}
          onClick={selectItem}
          selected={selectedItemIndex}
          listRef={listRef}
        />
      )}
    </div>
  );
}

export default AutoCompleteInput;
