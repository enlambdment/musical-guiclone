// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
const body = document.querySelector('body');

// function to generate random integer within a range
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}

// how to define a constructor for button elements
// that I can then populate into a grid?
const rand_x = random(3,6);
const rand_y = random(3,6);

/* double loop. Loosely speaking
(using 'ul' for unordered list won't really do it because
this will be bullet-pointed like a text list)
1. for each i in range(rand_x), create a column
2. then, to that i'th col, add for each j in range(rand_y)
   one button element
*/
for (let i = 0; i < rand_x; i++) {
  // 'span' is an HTML element type for generic containers
  let button_col = document.createElement('span');
  // give it a descriptive class
  button_col.className = "button_col";
  // now, fill it with buttons
  for (let j = 0; j < rand_y; j++) {
    var button = document.createElement('button');
    button_col.appendChild(button);
  }
}