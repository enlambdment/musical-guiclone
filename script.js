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

/* double loop. Loosely speaking:
1. for each i in range(rand_x), create a column
    (represented generically as an unordered list 'ul'?)
2. then, to that i'th col, add for each j in range(rand_y)
*/