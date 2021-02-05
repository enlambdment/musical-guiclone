/* We need a SoundFontPlayer */
let player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

/* You have to set up the player with a callback object
   before you can use it.
   The coconet GUI code in script.js does this inside an init()
   function which also handles set up for event listeners.
   But maybe I don't have to do it that way.
*/
let playerHardStop = false;

// When start button is clicked, elicit the creation of 
// a promise which is either fulfilled, if an AudioContext
// can be created, or else unfulfilled if not.
// The AudioContext is needed for the player to synthesize audio.
document.querySelector('.start-btn').addEventListener('click', async () => {
  await player.start()
  console.log('audio is ready')
})

// When play / stop button is clicked, elicit the process
// which checks whether audio is currently playing, plays what 
// is on the musical grid GUI if not, and stops the player audio
// if so.
document.querySelector('.playpause-btn').addEventListener('click', playOrPause);

// When infill button is clicked, elicit the process which 
// fills in some additional musical material to the board
// (either via pre-trained model or some other generation logic.)
document.querySelector('.infill-btn').addEventListener('click', infill);

/* Create a grid of buttons: this is the musical GUI */
const buttonGrid = new ButtonGrid();

// Load sound fonts.
// (Will global variables from board.js be in scope here?)
const allNotes = [];
// Experiment with the attributes set for the note 
// being pushed to 'allNotes' so that it sounds for
// a shorter time? (startTime, endTime)
for (let i = 0; i < buttonGrid.grid_height; i++) {
  allNotes.push({pitch: MAX_PITCH - i, velocity: 80});
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
    
    // 2. toggle the cell at this position, so we can know the updated
    //    cell state.
    buttonGrid.toggleCell(row, col);
    
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
  return;
}

function infill() {
  return;
}