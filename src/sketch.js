let canvas;
let view;
let handler;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  view = new View();
  handler = new Handler();
}

function draw() {
  view.tick();
  push();
  view.apply();
  background(51);
  grid();
  handler.tick();
  handler.show();
  pop();
}



function mousePressed(e) {
  if (e.button === 0) {
    if (!handler.draggable()) {
      view.anchorMouse(mouseX, mouseY);
      view.dragEnabled = true;
    }
  }
}

function mouseReleased(e) {
  view.dragEnabled = false;
  handler.releaseDrag();
}

function mouseWheel(e) {
  e.preventDefault();
  view.zoom = e.delta < 0 ? 1 : -1;
}

window.onresize = function() {
  canvas.size(window.innerWidth, window.innerHeight);
  width = window.innerWidth;
  height = window.innerHeight;
}
