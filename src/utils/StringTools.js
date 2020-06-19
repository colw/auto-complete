/*
  Given two strings (text and highlightText), return a tuple
  such that the the combination of all 3 would equal text,
  with the middle value being highlightText.
*/
export function splitTextOn(text, highlightText) {
  const position = indexOfIgnoreAccent(text, highlightText);
  if (position === -1) {
    return [text];
  } else {
    return [
      text.slice(0, position),
      text.substr(position, highlightText.length),
      text.slice(position + highlightText.length),
    ];
  }
}
// This will return the position of a character in a string, ignoring accents.
// Since unlike String.indexOf(), this only compares string 1:1, we need to loop
// over each set of characters.
export function indexOfIgnoreAccent(word, searchTerm) {
  const lowerWord = word.toLowerCase();
  const lowerSeachTerm = searchTerm.toLowerCase();
  for (let index = 0; index < word.length - searchTerm.length + 1; index++) {
    const sub = lowerWord.substr(index, searchTerm.length);
    const pos = sub.localeCompare(lowerSeachTerm, undefined, {
      sensitivity: "base",
    });
    if (pos === 0) {
      return index;
    }
  }
  return -1;
}
