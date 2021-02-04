// we will span 3 octaves in the grid exposed
const GRID_HEIGHT = 36;
// models 6 measures, each having 4 quarter-note beats
const GRID_WIDTH = 24; 
// highest possible pitch
const MAX_PITCH = 67;

/* JS class for a grid of buttons labelled with 
   random emojis from a list.
   The grid dimensions are between 3x3 and 6x6.
*/
class ButtonGrid {
  constructor() {
    
    // Going forward, we want to have an property 
    // which we will populate with empty JS objects ({}'s)
    // for each button.
    // We will keep track of updates to the musical "score"
    // being built up by clicks / model infilling by means 
    // of updates to the {}'s at the appropriate indices of
    // this.data, which will become a 2D array.
    // As well, we will eventually marshall into / unmarshall from
    // intermediate "hash strings" that will serve as a format for
    // the model / synth to use, in infilling / sound generation resp.
    this.data = [];
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
     3b. aria-label is set to "cell, {empty | soprano | alto | tenor | bass}" -
         the 2nd value in the attribute list is 'empty' to start with, but changes
         based upon whatever the user selects for the current voice to paint in
         when they click GUI squares.
         ('aria-label' is like 'title' but supports richer functionality for
          assistive technologies which enhance user accessibility.)
     3c. class is set to "pixel, {voice | voice0 | voice1 | voice2 | voice3}" -
         this is effectively a re-labelling of the same possible attribute values
         as are indicated in aria-label, but these names are the ones which 
         the CSS selectors refer to (vs. those in the aria-label which are chosen
         to have natural-language significance for musical persons)
     3d. finally, data-row, data-col and data-pitch are set to match the current
         i value for the outer (per-row) loop, the current j value for the inner 
         (per-col) loop, and the same data-pitch as was derived previously for the
         row, respectively.
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
    for (let i = 0; i < this.grid_height; i++) {
      // update this.data property to track, in JS data structure,
      // parallel information to the state changes that will apply 
      // in HTML DOM
      this.data.push([]); // <- representing the current DOM row
      
      // we'll create a 'div' el to serve as a generic 
      // row container
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');
      
      // set 'dataset' custom attr to store pitch per row.
      // The pitch per row will decrease as we go from 
      // higher up (lower i) to lower down (greater i) rows
      const pitch = MAX_PITCH - i;
      rowEl.dataset.pitch = pitch;
      
      this.ui.container.appendChild(rowEl);
      
      /* Initial element populating the current row is a 
         generic span-el to carry a label with the row pitch.
         I am choosing to handle this differently vs. in the 
         coconet GUI, where the inner loop handles both the 
         span-el creation & the buttons creation for the grid proper.
      */
      const spanEl = document.createElement('span');
      
      // We can use 'setAttribute' to set element attr's generically
      spanEl.setAttribute('class', 'piano-key off');
      spanEl.textContent(pitch);
      
      // add the label span-el to start out the row
      rowEl.appendChild(spanEl);
      
      // inner for-loop to populate the current row
      for (let j = 0; j < this.grid_width; j++) {
        const button = document.createElement('button');
        button.setAttribute('aria-label', 'cell, empty');
        
        // In the coconet GUI I am working backwards from,
        // '.pixel' class selector (and not 'button' 
        // element-type selector) is used to give CSS styling
        // to the musical GUI buttons
        button.classList.add('pixel');
        button.dataset.row = i;
        button.dataset.col = j;
        button.dataset.pitch = pitch;
                
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

