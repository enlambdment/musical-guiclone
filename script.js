/* We need a SoundFontPlayer */
// let player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

/* Create a grid of buttons: this is the musical GUI */
const buttonGrid = new ButtonGrid();

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
    
    // 2. toggle the cell at this position, so we can know the updated
    //    cell state.
    buttonGrid.toggleCell(row, col);
    
    // 3. if the cell has become activated (turned on), sound out its pitch.
    
  }
}
