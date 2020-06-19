# AutoCompleteInput

Clone the repository then run `yarn && yarn start` to see the example page.

## Component Usage

`<AutoCompleteInput value={…} initOptions={…} onChange={…} />`

- value: String representing currently selected text.
- initOptions: An array of strings.
- onChange: Function that receives event.

## Notes
- Suggestion box highlights current input.
- Arrow keys will move the selection up and down.
- Enter will fill the input with the currently selected item, and submit.
- You can also submit using the "submit" button.
- Escape will hide the suggestion box.

## Todo
- Scroll the option box when using arrow keys and selection goes out of bounds.
- Ideally a user should be able to type "Acai" and the widget will helpfully return "Açaí".

  _Note: The `String.normalize()` method may help here._
  

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

