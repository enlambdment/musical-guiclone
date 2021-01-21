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

// Factor out the pattern of random array-element selection;
// I'll need it later
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
        // give the button a random emoji for contents?
        let emojiRand = randomEmoji();
        button.innerHTML = emojiRand;
        
        // custom attributes for the current button 
        // being worked on
        button.classList.add('emojiclick');
        button.dataset.row = i;
        button.dataset.col = j;
        
        
        /* TODO TODO TODO TODO TODO TODO TODO TODO 
        
          Having this big anonymous function provided directly to every
          button, in the 'button.onclick = function () { ... }' statement
          below, feels unfortunate because such a big piece of functionality
          should really (maybe?) be brought 'higher-level', possibly even as 
          a ButtonGrid method (?)
          
          In that way, the ButtonGrid method to perform this logic would 
          accept explicit parameters for row & col position of a button, and
          meanwhile some event-handler in the main (not the ButtonGrid class) code
          would take care of handling mouse-click events by identifying the button
          clicked on, getting those parameters & passing them to this method.
          
          So, refactor this once I get the chance!
        
           TODO TODO TODO TODO TODO TODO TODO TODO */
        
        // give every button a function reference saying to do a specific
        // thing once the button is clicked.
        // Why doesn't this work if I try to factor out the function
        // and give it a name, as a method of ButtonGrid class?
        button.onclick = function () {
          // 'Within the function, 'this' will be the object that
          // 'onclick' was bound to'.
          
          let buttonRow = parseInt(this.dataset.row);
          console.log('buttonRow is: ' + buttonRow);
          let buttonCol = parseInt(this.dataset.col);
          console.log('buttonCol is: ' + buttonCol);
                    
          // Define range in which to get neighbors.
          // Get the maximum possible col and row indices.
          let containerEl = this.parentNode.parentNode;
          let maxCol = parseInt(containerEl.dataset.gridWidth) - 1;
          console.log('maxCol is: ' + maxCol);
          let maxRow = parseInt(containerEl.dataset.gridHeight) - 1;
          console.log('maxRow is: ' + maxRow);
          
          // There's going to be some Array / map / filter stuff going on.
          let oneDimNeighbors = Array(3).fill(-1).map((x, y) => x + y);
          let colIndices = oneDimNeighbors.map(idx => buttonCol + idx);
          let rowIndices = oneDimNeighbors.map(idx => buttonRow + idx);
          
          // This will be an array of 2-item array [colIdx, rowIdx].
          /* Approach to get neighbors:
               a. create the 3-x-3 subgrid of locations (index tuples)
                  centered at the (col, row) of the current button being
                  clicked on;
              b.  then, filter out the current button's tuple
              c.  and all those which lie off the grid */
          let neighborIndices = colIndices
            .map(colIdx => rowIndices
                .map(rowIdx => [colIdx, rowIdx]))
                  .reduce((acc, x) => acc.concat(x), [])
                    .filter(arr =>
                      // exclude current button being clicked.
                      // Array equality in JS is extensional not intensional!
                      !(arr[0] == buttonCol && arr[1] == buttonRow) &&
                      // col-part (x-coord) must not lie off the grid
                      (arr[0] >= 0 && arr[0] <= maxCol) &&
                      // row-part (y-coord) must not lie off the grid
                      (arr[1] >= 0 && arr[1] <= maxRow));
                              
          // Get surrounding elements.
          // First get all button elements.
          let allEmojiclicks = containerEl.querySelectorAll('div button');
          let arrEmojiclicks = Array.from(allEmojiclicks);

          // Then, filter down based upon .dataset.row / .dataset.col custom attributes,
          // using neighborIndices that we built above
          let neighbors = arrEmojiclicks
          // What I really am trying to do is filter down neighbors, an array of buttons,
          // to just those array members which satisfy the predicate:
          // [button.dataset.col, button.dataset.row] in neighborIndices
          // ... but this gets back to the fact that you don't just slap an 
          // '==' between 2 arrays to compare them.
          // Still, I think I can manage.
            .filter(button => 
                (neighborIndices.some(arr => 
                    (arr[0] == button.dataset.col && arr[1] == button.dataset.row))));
                    
          // The goal of getting these neighbor elements is to 
          // 1. identify the emojis in each of them, then
          let neighborEmojis = neighbors
            .map(button => button.innerHTML);
          // 2. select randomly from the array, subsequently
          let randNeighborEmoji = randArrayItem(neighborEmojis);
          // 3. *re-assigning the current-button innerHTML to have this
          //     new emoji* as the main effect of the .onclick function
          this.innerHTML = randNeighborEmoji;
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