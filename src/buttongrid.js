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
    this.grid_height = GRID_HEIGHT;
    this.max_pitch = MAX_PITCH;
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
    this.ui.container = document.getElementById('container');
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
      spanEl.setAttribute('class', 'piano-key');
      spanEl.textContent = pitch;
      
      // add the label span-el to start out the row
      rowEl.appendChild(spanEl);
      
      // inner for-loop to populate the current row
      for (let j = 0; j < this.grid_width; j++) {
        // JS data-structure reflection of the DOM musical state.
        // In the simplified model that I am adopting, there are 
        // no distinctions for musical voices , and no masking / 
        // erasing. 
        // So, a .pixel's reflection in JS structure will only 
        // ever have one of two states: off (0) or on (1).
        // Upon creation, .on will be set to 0.
        this.data[i][j] = {};
        this.data[i][j].on = 0;
        
        const button = document.createElement('button');
        
        // The 2nd part of 'aria-label' attribute will evolve
        // as it is selected, depending on whether the cell
        // is off (default state upon initialization) or on.
        button.setAttribute('aria-label', 'cell, off');
        button.setAttribute('class', 'pixel');
        button.dataset.row = i;
        button.dataset.col = j;
        button.dataset.pitch = pitch;
                
        // add the current (j'th) button to the current (i'th) list
        rowEl.appendChild(button);
      }
    } 
  // Following the set-up for the GUI grid, we will create
  // an additional this.ui property to contain all the rows in DOM
  this.ui.rows = document.querySelectorAll('.container > .row');
  }
  
  // Toggles a particular dot from on to off.
  // We need a 3rd param to distinguish user action
  // vs. infill action toggling
  toggleCell(i, j, flag) {
    // Search for a .pixel element at (i,j)-th location
    const uiButton = document.querySelector(
      `.pixel[data-row="${i}"][data-col="${j}"]`);
    if (!uiButton) {
      return;
    }
    
    // Because we are *not* distinguishing between voices / vocal
    // ranges, we do not need to know the pitch of the square we are
    // updating state for. Just need to toggle the appropriate state,
    // changing it into its opposite.
    
    // What should happen if an off (=== 0) cell 
    //                       or on  (=== 1) cell is clicked by user (flag === 1)?
    // Switch it to its opposite state.
    // However, if an infilled      (=== 2) cell is clicked by user (flag === 1),
    // then turn on the cell as a user-clicked cell. (=== 1).
    // What should happen if an off (=== 0) cell
    //                       or on  (=== 1) cell is infilled        (flag === 2)?
    const dot = this.data[i][j];
    // CASE OF USER CLICK (flag === 1)
    if (flag === 1) {
      if (dot.on === 1) {
        dot.on = 0;
      } else {
        dot.on = 1;
      };
      // CASE OF INFILL (flag === 2)
    } else if (flag === 2) {
      // Override JS obj. 'on'-val. at location to 2,
      // labelling it as infilled cell, regardless of 
      // current state
      dot.on = 2;
    };
    
    // Besides flipping the value of 'dot', there are 2 other things
    // we have to take care of:
    /* 1. calling updateHash() method, to update the hash string
          serializing the musical material due to current board state
          so that addition / removal of musical notes is reflected
       2. calling resetButton() / maskButton() / voiceButton() method, 
          so that the attributes of the DOM element can be updated, 
          and the visual appearance of the grid in turn change to reflect
          this (by different CSS rules being applied to the element.)
          In this simplified context, there is no such thing as masking,
          and separate voices do not come into play, so the logic within
          the resetButton() / voiceButton() implementations can be 
          radically simplified or even collapsed into one function,
          which is what I will attempt to do.
    */
    this.updateHash();
    this.updateButton(uiButton, dot.on);
  }
  
  // Serializes the current state of the board into a 
  // string, for loading & using elsewhere e.g. synthesizing
  // into audio signal, infilling via pre-trained model.
  // (I *think* that is the purpose which the hash serves, but
  // I have yet to locate the code where this happens.)
  updateHash() {
    let s = '';
    // iterate over rows
    for (let i = 0; i < GRID_HEIGHT; i++) {
      // iterate over cols
      for (let j = 0; j < GRID_WIDTH; j++) {
        let cellOn = this.data[i][j].on ;
        if (cellOn === 1 || cellOn === 2) {
          // Also include a 3rd param indicating the reason that the cell is on
          // (.on === 1 for user click vs. .on === 2 for infill)
          s += `${MAX_PITCH-i}:${j}:${cellOn}`;
        }
      }
    }
        
    // This puts the current contents of the GUI 
    // into the window URL, in serialized form.
    // It is preceded by a #-symbol.
    window.location.hash = s.substring(0, s.length-1);
  }
  
  // Modify the DOM node for the UI button (1st param)
  // in accordance with the current state (2nd param),
  // which now has 3 possible values:
  // btnState = 0:   off
  // btnState = 1:   on, due to user click
  // btnState = 2:   on, due to infill
  updateButton(btn, btnState) {
    if (btnState === 2) {
      btn.setAttribute('class', 'pixel infill');
      btn.setAttribute('aria-label', 'cell, infill');
    } else if (btnState === 1) {
      btn.setAttribute('class', 'pixel voice');
      btn.setAttribute('aria-label', 'cell, on')
    } else if (btnState === 0) {
      btn.setAttribute('class', 'pixel');
      btn.setAttribute('aria-label', 'cell, off');
    }
  }
  
  // Accepts a serialized board state and produces from it
  // a NoteSequence which Magenta.js will be able to work with
  // for audio synthesis / manipulation with music models.
  /* (I think the idea here is to receive, as a result of 
      some pre-trained model's generation, a revised score
      serialization that then has to be fed back into the
      DOM grid and the JS this.data, updating both.)
  */
  loadHash(s) {
    const steps = s.split(',');
    const notes = [];
    for (let i = 0; i < steps.length; i++) {
      const pair = steps[i].split(':');
      // build up the 'notes' value for the
      // NoteSequence that we will build
      notes.push(
        {pitch: parseInt(pair[0]),
        // no 'instrument' applicable bc. no voice part 
         quantizedStartStep: parseInt(pair[1]),
         quantizedEndStep: parseInt(pair[1]) + 1});
    }
    // now a NoteSequence is built for Magenta.js to use
    const ns = {};
    ns.notes = notes;
    ns.quantizationInfo = {'stepsPerQuarter':4};
    ns.totalQuantizedSteps = GRID_WIDTH;
    
    // Omit until I know what this does, or why
    // it calls 'updateHash'
    // this.drawNoteSequence(ns); // <- ? 
  }
  
  // Obtain NoteSequence from the JS ButtonGrid object's data.
  getNoteSequence() { 
    const sequence = {
      notes: [], 
      quantizationInfo: {stepsPerQuarter: 4}};
    // loop over rows
    for (let i = 0; i < GRID_HEIGHT; i++) {
      const row = document.querySelector(
        `.row[data-pitch="$MAX_PITCH - i]"`);
      // loop over cols
      for (let j = 0; j < GRID_WIDTH; j++) {
        // add to sequence.notes, if note at this
        // pitch / time is on
        if (this.data[i][j].on > 0) {
          sequence.notes.push(
            { pitch: MAX_PITCH - i,
              quantizedStartStep: j,
              quantizedEndStep: j + 1
            });
        }
      }
    }
    if (sequence.notes.length !== 0) {
      sequence.totalQuantizedSteps = GRID_WIDTH;
    }
    
    // this.updateHash() ?
    return sequence;
  }
} 

// ??
export { ButtonGrid };