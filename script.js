// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
const body = document.getElementById('container');

// // function to generate random integer within a range
// function random(min, max) {
//   const num = Math.floor(Math.random() * (max - min + 1)) + min;
//   return num
// }

// // how to define a constructor for button elements
// // that I can then populate into a grid?
// const rand_x = random(3, 6);
// const rand_y = random(3, 6);

const rand_x = 2;
const rand_y = 3;

// some emojis to play around with?

/* double loop. Loosely speaking
(using 'ul' for unordered list won't really do it because
this will be bullet-pointed like a text list)
1. for each i in range(rand_x), create a column
2. then, to that i'th col, add for each j in range(rand_y)
   one button element
*/
// for (let i = 0; i < rand_x; i++) {
//   // 'span' is an HTML element type for generic containers
//   let button_col = document.createElement('span');
//   // give it a descriptive class
//   button_col.className = "button_col";
//   // now, fill it with buttons
//   for (let j = 0; j < rand_y; j++) {
//     var button = document.createElement('button');
//     button_col.appendChild(button);
//   }
//   document.body.append(button_col);
// }

/* 
 So far, each button_col is getting
 populated with buttons - good!
 But, each button_col is getting shown
 horizontally, instead of as a column - bad!
*/

class ButtonGrid {
  constructor() {
    this.ui = {};
    this.reset();
  }
  
  reset() {
    // get id='container' el, which here is a 'div' el
    this.ui.container = document.getElementById('container');
    // blank out el contents
    this.ui.container.innerHTML = '';
    
    // recreate the grid.
    for (let i=0; i < rand_y; i++) {
      // we'll create a 'div' el to serve as a generic 
      // row container
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');
      this.ui.container.appendChild(rowEl);
      // inner for-loop to populate the current row
      for (let j=0; j < rand_x; j++) {
        const button = document.createElement('button');
        // custom attributes for the current button 
        // being worked on
        button.classList.add('pixel');
        button.dataset.row = i;
        button.dataset.col = j;
        rowEl.appendChild(button);
      }
    }
  }
}

// once we create a ButtonGrid instance,
// we still have to place it somewhere in the 
// DOM for it to appear on the page
const myButtonGrid = new ButtonGrid();