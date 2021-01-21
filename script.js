// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
const body = document.getElementById('container');

// function to generate random integer within a range
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}

// some emojis to play around with?
const EMOJI_LIST = [
  '📗', '🔒', '🛡️', '🔮', '🗿', '💈', 
  '💙', '🎴', '📯', '🎾', '🎱', '🎲', 
  '🥁', '🦄', '🛎️', '💎', '🏮', '🛢️'];

function randomEmoji() {
  let randIdx = random(0, EMOJI_LIST.length - 1);
  return EMOJI_LIST[randIdx];
}

/* JS class for a grid of buttons labelled with 
   random emojis from a list.
   The grid dimensions are between 3x3 and 6x6.
*/
class ButtonGrid {
  constructor() {
    this.ui = {};
    
    // Upon constructing a new ButtonGrid object, 
    // random grid width and grid height will be
    // generated & assigned as object properties
    this.grid_width = random(4, 6);
    this.grid_height = random(4, 6);
    this.reset();
  }
    
  reset() {
    // get id='container' el, which here is a 'div' el
    this.ui.container = document.getElementById('container');
    // blank out el contents
    this.ui.container.innerHTML = '';
    
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
        // give the button a random emoji for contents?
        let emojiRand = randomEmoji();
        button.innerHTML = emojiRand;
        
        // custom attributes for the current button 
        // being worked on
        button.classList.add('emojiclick');
        button.dataset.row = i;
        button.dataset.col = j;
        
        // give every button a function reference saying to do a specific
        // thing once the button is clicked.
        // Why doesn't this work if I try to factor out the function
        // and give it a name, as a method of ButtonGrid class?
        button.onclick = function () {
          // 'Within the function, 'this' will be the object that
          // 'onclick' was bound to'
          let buttonRow = this.dataset.row;
          let buttonCol = this.dataset.col;
          
          // for debugging
          console.log(buttonCol, buttonRow);
          
          // I now need to grab the 'innerHTML' of all adjacent button els,
          // so this will require me to access the parent node & then get 
          // those of its children nodes which satisfy that condition
          
          // can I see what element I've clicked on, in JS console?
          console.log(this);
          /* Typical output is like e.g.
          <button class="emojiclick" data-row="2" data-col="2">💙</button>
          */
          
          
          
          // get surrounding elements
          let neighbors = this.parentNode.querySelectorAll(
            // CSS selector string to get all child 'emojiclick'-class
            // elements having
            //     buttonRow - 1 <= row attribute <= buttonRow + 1
            //     buttonCol - 1 <= col attribute <= buttonCol + 1
            // but not landing outside of the range of the grid size
            );
          }
        
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

/* The below is unnecessary!
    Reason: Upon creating a new ButtonGrid instance, the new object's
    own 'reset()' method is called, which in turn takes care of creating 
    each row, in turn, and populating it with button el's.
*/
// body.appendChild(myButtonGrid);

  /* IDEA FOR NEXT TIME:
  Add some functionality so that, upon the click event
  firing for a button, it randomly selects one of the 
  emojis from the surrounding elements & swaps that one in?
  
  When a button is clicked:
  1. How is the click event registered?
  2. What is the JS functionality to locate the place that was clicked
      & the button at that location?
      
  The way this seems to work in the coconet source code:
  * Board() class -
      has a method 'toggleCell(i, j, voice)' that identifies whether
      the grid item with data-row='i', data-col='j' actually exists 
      & is part of the musical GUI.
      If so, it then sets about modifying the dot.on property, where
      dot = this.data[i][j].
  * script.js -
      the class='container' div el which contains the musical GUI grid
      is given various event listeners (.addEventListener(..)), among them
          container.addEventListener('mousedown', (event) => { isMouseDown = true; clickCell(event) });
          container.addEventListener('mouseup', () => isMouseDown = false);
      then there is a function 'clickCell(event)' which uses either document.elementFromPoint(..) or
      event.target to get the button el, and then in turn its dataset attributes 'row' and 'col'.
  */