const GRID_HEIGHT = 15;
// models 6 measures, each having 4 quarter-note beats
const GRID_WIDTH = 24; 

// // function to generate random integer within a range
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}

// some emojis to play around with?
// const EMOJI_LIST = [
//   '📗', '🔒', '🛡️', '🔮', '🗿', '💈', 
//   '💙', '🎴', '📯', '🎾', '🎱', '🎲', 
//   '🥁', '🦄', '🛎️', '💎', '🏮', '🛢️'];
const EMOJI_LIST = [
  '']

// // Factor out the pattern of random array-element selection;
// // I'll need it later
function randArrayItem(arr) {
  let randIdx = random(0, arr.length - 1);
  return arr[randIdx];
}

function randomEmoji() {
  let getEmoji = randArrayItem(EMOJI_LIST);
  return getEmoji;
}

/* JS class for a grid of buttons labelled with 
   random emojis from a list.
   The grid dimensions are between 3x3 and 6x6.
*/
class ButtonGrid {
  constructor() {
    this.ui = {};
    
    // Upon constructing a new ButtonGrid object, 
    // width and height (each measured in number of button squares)
    // are assigned using global const's
    this.grid_width = GRID_WIDTH;
    this.grid_height = GRID_HEIGHT
    this.reset();
  }
  
  /*
  GOAL: Refine the simplified model of an interactive grid of buttons,
  by implementing more of the coconet GUI model.
  The following features are relevant:
  1. Each row of buttons is represented by a div-el, class="row".
     The JS dataset.<attr-name> is used to set a custom element property
     of 'data-pitch', and as i ranges from 0 (top row) to GRID_HEIGHT-1 (bottom row),
     this is assigned to decreasing pitch values by using: MAX_PITCH - i
  2. The first child element of each row-div is a generic span element
     whose main purpose is to contain the data-pitch for the current row,
     as a visual reminder.
  3. The following child elements are then the buttons constituting the GUI grid proper.
     Each of these has the following features:
     3a. button element
     3b. 
  */
  reset() {
    // get id='container' el, which here is a 'div' el
    this.ui.container = document.getElementById('container');
    // blank out el contents
    this.ui.container.innerHTML = '';
    // Assigning grid dimensions using 'dataset' custom attr's
    // so we can use them later on
    this.ui.container.dataset.gridWidth = this.grid_width;
    this.ui.container.dataset.gridHeight = this.grid_height;
    
    // recreate the grid.
    for (let i=0; i < this.grid_height; i++) {
      // we'll create a 'div' el to serve as a generic 
      // row container
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');
      this.ui.container.appendChild(rowEl);
      // inner for-loop to populate the current row
      for (let j=0; j < this.grid_width; j++) {
        const button = document.createElement('button');
        
        // custom attributes for the current button 
        // being worked on
        button.classList.add('emojiclick');
        button.dataset.row = i;
        button.dataset.col = j;
                
        // add the current (i'th) button to the current (j'th) list
        rowEl.appendChild(button);
      } 
    } 
  } 
} 

// once we create a ButtonGrid instance,
// we still have to place it somewhere in the 
// DOM for it to appear on the page
const myButtonGrid = new ButtonGrid();

// Set up touch events.
// The row-class divs of buttons were laid out within
// the container-class div that ButtonGrid() inserts in
// the DOM upon being called. 
const body = document.getElementById('container');

