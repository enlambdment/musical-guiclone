
import { ButtonGrid } from "./buttongrid.js";
import * as mm from "@magenta/music";
import * as pd from "probability-distributions";

// Also remember to import from css stylesheet (why?)
// Currently breaking, no idea why because I did 
// specify in webpack.config.js a loader for CSS files
import "./app.css";

let player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

/* You have to set up the player with a callback object
   before you can use it.
   The coconet GUI code in script.js does this inside an init()
   function which also handles set up for event listeners.
   But maybe I don't have to do it that way.
*/
let playerHardStop = false;

// When play / stop button is clicked, elicit the process
// which checks whether audio is currently playing, plays what 
// is on the musical grid GUI if not, and stops the player audio
// if so.
document.querySelector('.playpause-btn').addEventListener('click', playOrPause);

// When infill button is clicked, elicit the process which 
// fills in some additional musical material to the board
// (either via pre-trained model or some other generation logic.)
document.querySelector('.infill-btn').addEventListener('click', infill2); // <- try infill2 to see if it works

/* Create a grid of buttons: this is the musical GUI */
const buttonGrid = new ButtonGrid();

// Load sound fonts.
// (Will global variables from board.js be in scope here?)
const allNotes = [];
// Experiment with the attributes set for the note 
// being pushed to 'allNotes' so that it sounds for
// a shorter time? (startTime, endTime)
for (let i = 0; i < buttonGrid.grid_height; i++) {
  allNotes.push({pitch: buttonGrid.max_pitch - i, velocity: 80});
}
player.loadSamples({notes: allNotes});



/* To introduce the main interactivity with the musical
   GUI grid, we will need to:
  a) introduce an event listener on the container el, but
  b) also make sure, in the callback fn provided to the 
     event listener, that the type and / or class of the 
     event (click) target is checked, and functionality 
     only carried out if the target was indeed a button.
     This is the safest / most principled thing to do, I think.
*/
const container = document.getElementById('container');
container.addEventListener('click', clickCell);

// function to generate random integer within a range
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randArrayItem(arr) {
  let randIdx = random(0, arr.length - 1);
  return arr[randIdx];
}

function clickCell(event) {
  // obtain event target
  let tgt = event.target;
  
  // if target was not a button, exit
  if (tgt.tagName !== "BUTTON") {
    return;
  } else {

    // 1. get the position (row and col) of the selected button
    const row = parseInt(tgt.dataset.row);
    const col = parseInt(tgt.dataset.col);
    const pitch = parseInt(tgt.dataset.pitch);
    
    /* IDEA: Try to direct the user to only create a single melody,
    
    */
    
    // 2. toggle the cell at this position, so we can know the updated
    //    cell state.
    // ADD NEW PARAM to toggleCell to distinguish
    // cells toggled by user input vs. cells toggled
    // infill.
    // We will label user input as 1.
    buttonGrid.toggleCell(row, col, 1);
    
    // 3. if the cell has become activated (turned on), sound out its pitch.
    //    Use the row / col values to access the corresponding part of the
    //    board's data.
    const dot = buttonGrid.data[row][col];
    if (dot.on === 1) {
      const note = {pitch: pitch, velocity: 80};
      // Begin sounding the note.
      player.playNoteDown(note);
      // Finish sounding the note. This action is provided
      // as a callback to 'setTimeout' so that the specified 
      // number of milliseconds may elapse before the tone ends.
      setTimeout(() => player.playNoteUp(note), 150);
    }
  }
}

function playOrPause() {
  const error = document.getElementById('error');
  // check whether SoundFontPlayer instance is playing
  if (player.isPlaying()) {
    player.stop();
  } else {
    const nseq = buttonGrid.getNoteSequence();
    play(nseq);
  }
  // if !(player.isPlaying()) then call play() 
  // (which we the author of script.js
  // have to define.)
  // Add back check that nseq should not be empty
  // before invoking play().
  
}

function play(sq) {
  // merge together copies of adjacent notes so that 
  // instead of each of them sounding, one note of 
  // the total duration sounds.
  
  // This isn't working quite like I expected. Why?
  const msq = mm.sequences.mergeConsecutiveNotes(sq);
  /* Set tempo first. Param is in qpm (quarter-note per minute) */
  player.setTempo(100);
  /* elicit the creation of a promise which is either fulfilled, 
      if an AudioContext can be created, or else unfulfilled if not.
     The AudioContext is needed for the player to synthesize audio. */
  player.start(msq);      
}

function infill() {
  const bgData = buttonGrid.data;
  const consonances = [0,3,4,7,8,9];
  let pitchesPerTime = [];
  for (let i = 0; i < buttonGrid.grid_width; i++) {
    // get all possible row indices
    const rowIdxs = Array(buttonGrid.grid_height).fill(0).map((x,y) => x+y);
    // take only the row indices for which the cell at that row index,
    // and col index: i, is active by user (.on === 1)
    const onIdxs = rowIdxs.filter(idx => bgData[idx][i].on === 1);
    // before pushing onto pitchesPerTime, we should convert from
    // index to pitch (= MAX_PITCH - index)
    pitchesPerTime.push(onIdxs.map(idx => buttonGrid.max_pitch - idx));
  }
  
  let allPitches = Array(buttonGrid.grid_height).fill(buttonGrid.max_pitch).map((x,y) => x-y);
    
  let infillPitches = [];
  for (let i = 0; i < buttonGrid.grid_width; i++) {
    // get ith array in pitchesPerTimes
    let currentPitches = pitchesPerTime[i];
    // is it empty?
    if (currentPitches.length === 0) {
        // if so, just get a random pitch
        let randPitch = randArrayItem(allPitches);
        infillPitches.push(randPitch);
    } else {
        // if not empty, harmonize with a pitch from currentPitches
        let basePitch = randArrayItem(currentPitches); 
        let consonantPitches = allPitches.filter(
            p => consonances.includes(Math.abs(p - basePitch) % 12));
        let randPitch = randArrayItem(consonantPitches);
        infillPitches.push(randPitch);
    };
  };
  
  for (let entry of infillPitches.entries()) {
    // use MAX_PITCH - entry[1], entry[0];
    buttonGrid.toggleCell(buttonGrid.max_pitch - entry[1], entry[0], 2);
  };
  
  return infillPitches;
}

// infill function, take #2
function infill2() {
  const bgData = buttonGrid.data;
  const consonances = [0,3,4,7,8,9];
  let pitchesPerTime = [];

  for (let i = 0; i < buttonGrid.grid_width; i++) {
    // get all possible row indices
    const rowIdxs = Array(buttonGrid.grid_height).fill(0).map((x,y) => x+y);
    // take only the row indices for which the cell at that row index,
    // and col index: i, is active by user (.on === 1)
    const onIdxs = rowIdxs.filter(idx => bgData[idx][i].on === 1);
    // before pushing onto pitchesPerTime, we should convert from
    // index to pitch (= MAX_PITCH - index)
    pitchesPerTime.push(onIdxs.map(idx => buttonGrid.max_pitch - idx));
  }
  
  let allPitches = Array(buttonGrid.grid_height).fill(buttonGrid.max_pitch).map((x,y) => x-y);
  
  // Revise logic from here through rest of function body.  
  let infillPitches = [];
  let di;
  for (let i = 0; i < buttonGrid.grid_width; i += di) {
    // start keeping track of a consonantPitch.
    // Eventually, we want for the distance of every pitch
    // from the one which it follows to be governed by a 
    // probability distribution (e.g. binomial dist, etc.)
    let consonantPitch;
    
    // get ith array in pitchesPerTime
    let currentPitches = pitchesPerTime[i];
    // is it empty?
    if (currentPitches.length === 0) {
        // if so, just get a random pitch
        let randPitch = randArrayItem(allPitches);
        consonantPitch = randPitch;
        // infillPitches.push(randPitch);
    } else {
        // if not empty, harmonize with the lowest pitch from currentPitches
        let bassPitch = Math.min(...currentPitches);
        let consonantPitches = allPitches.filter(
            p => consonances.includes(Math.abs(p - bassPitch) % 12));
        /* Later we're going to need to know the distance of current 
            consonantPitch value both from the Math.max and the Math.min
            of the resulting consonantPitches.
            This is so that we can be sure our randomly selected consonant 
            pitch won't lie outside of the range of all possible values that
            we can use on our GUI grid.
        */
        let randPitch = randArrayItem(consonantPitches);
        consonantPitch = randPitch;
        // infillPitches.push(randPitch);
    };
    
    // DEBUG
    console.log("Generating random pitch: ", consonantPitch);
    
    /* Later, each iteration of the above for-loop is going to give rise to
        a consonantPitchFill of form 'Array(<length>).fill(<value>)' that we
        want to concat to the end of infillPitches to build it up, rather than
        pushing single items at a time.
        HOWEVER - need to make sure don't result in infillPitches being too long,
        or else just don't use the 'extra' ones.
    */
    
    // randomly sample a duration for generated consonant-pitch
    di = pd.sample([1,2,3], 1, true, [0.25, 0.5, 0.25])[0];
    
    // DEBUG
    console.log("Generating random duration: ", di);
    
    let consonantPitchFill = Array(di).fill(consonantPitch);
    infillPitches.push(...consonantPitchFill);
    
    // DEBUG
    console.log("Current value of infill_pitches: ", infillPitches);
  };
  
  // pare down infillPitches to appropriate size.
  infillPitches = infillPitches.slice(0, buttonGrid.grid_width);
  
  // DEBUG
  console.log(infillPitches);
  
  for (let entry of infillPitches.entries()) {
    // use MAX_PITCH - entry[1], entry[0];
    buttonGrid.toggleCell(buttonGrid.max_pitch - entry[1], entry[0], 2);
  };
  
  return infillPitches;
}
