/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// Can I:
// 1. locate the 'container' class'ed element from the html DOM
// 2. add event listeners for mousedown / mouseup events
// 3. respond to mousedown events / mouseup events by modifying
//    some variable that I then can
// 4. print out to console?
let isMouseDown = false;

init();

function init () {
  const container = document.getElementById("container");
  container.addEventListener("mousedown", e => {
    isMouseDown = true;
    doClick(e);
  })
  
  container.addEventListener("mouseup", e => {
    isMouseDown = false;
  })
}

function doClick(event) {
  let tgt;
  tgt = event.target;
  console.log(tgt);
  console.log(typeof(tgt));
}
