import React, { useState, useRef } from "react";

/*
  Given two strings, text and highlightText, return a tuple
  such that the the combination of all 3 would equal text, 
  with the middle value being the highlightText,
*/
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

/* 
  Return a span text element such that an inner portion of
  the text is wrapped in a span tag.
*/
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
function AutoCompleteInput({ value = "", initOptions = [], onChange }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const listRef = useRef(null); // TODO: Use this ref to set scroll position

  function selectItem(text) {
    onChange({ target: { value: text } });
    setShowOptions(false);
  }

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
      const selectedItemText = filteredOptions[selectedItemIndex];
      selectItem(selectedItemText);
    } else if (event.keyCode === KEY_CODE.ESC) {
      setShowOptions(false);
    }
  }

  function handleTextChange(event) {
    const value = event.target.value;
    setShowOptions(true);
    const newFilteredOptions = initOptions.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setFilteredOptions(newFilteredOptions);
    setSelectedItemIndex(0);
    onChange(event);
  }

  return (
    <div className="autocomplete" onKeyDown={handleKeyDown}>
      <input
        autoComplete="off"
        id="input-choice"
        name="input-choice"
        onChange={handleTextChange}
        value={value}
        type="text"
      />
      {showOptions && (
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
