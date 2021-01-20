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

// double loop
// for each 