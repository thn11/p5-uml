let canvas;
let view;
let handler;
let font;
let connecting = false;

function preload() {
  font = loadFont('../assets/NotoMono-Regular.ttf');
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  view = new View();
  handler = new Handler();
  textFont(font);
  textSize(12);
}

function draw() {
  view.tick();
  view.apply();
  background(51);
  grid();
  handler.tick();
  handler.show();
}



function mousePressed(e) {
  if (e.button === 0) {
    if (!handler.draggable()) {
      view.anchorMouse(mouseX, mouseY);
      view.dragEnabled = true;
    }
  }
  if (e.button === 2) {
    handler.addTable(view.worldMouse);
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