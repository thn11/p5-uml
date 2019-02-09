let obj;
let view;
let oldMousePos;
let realMouseX;
let realMouseY;

let oldZoom;

// TODO: fix mouse paralax

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  obj = new Node();
  view = {
    zoom: 1,
    pos: createVector(0, 0),
  };
  oldMousePos = createVector(0, 0);
}

function draw() {
  fixMouse();
  push();
  translate(view.pos.x, view.pos.y);
  scale(view.zoom);
  background(51);

  let worldMouse = createVector(
    (mouseX - view.pos.x) / view.zoom,
    (mouseY - view.pos.y) / view.zoom
  );

  let oldWorldMouse = createVector(
    mouseX / oldZoom - view.pos.x / oldZoom, // divide by zoom to stop paralax?
    mouseY / oldZoom - view.pos.y / oldZoom
  );

  strokeWeight(8);
  stroke(255, 128, 0);
  point(worldMouse.x, worldMouse.y);
  stroke(128, 255, 0);
  point(oldWorldMouse.x, oldWorldMouse.y);
  strokeWeight(1);

  if (mouseIsPressed) {
    view.pos.sub(oldMousePos.sub(createVector(mouseX / view.zoom, mouseY / view.zoom)));
    oldMousePos = createVector(realMouseX, realMouseY);
  }
  obj.tick();
  obj.show();
  for (let i = 0; i < (width / view.zoom) / 20; i++) {
    for (let j = 0; j < (height / view.zoom) / 20; j++) {
      strokeWeight(2);
      point(i * 20, j * 20);
    }
  }
  pop();
}

function fixMouse() {
  realMouseX = mouseX / view.zoom;
  realMouseY = mouseY / view.zoom;
}

function mousePressed(e) {
  oldMousePos = createVector(realMouseX, realMouseY);
}

function mouseWheel(e) {
  console.log(view.pos);
  oldZoom = view.zoom;
  if (e.delta < 0) {
    view.zoom += view.zoom / 100;
  } else {
    view.zoom -= view.zoom / 100;
  }

  // calculate mouse position in current view
  // and subtract mouse position in new view
  // then subtract or add that to the position

  let oldMouseX = mouseX / oldZoom - view.pos.x / view.zoom;
  let oldMouseY = mouseY / oldZoom - view.pos.y / view.zoom;

  let newMouseX = (mouseX - view.pos.x) / view.zoom;
  let newMouseY = (mouseY - view.pos.y) / view.zoom;

  let deltaX = oldMouseX - newMouseX;
  let deltaY = oldMouseY - newMouseY;

  view.pos.sub(deltaX, deltaY);
}


class Node {


  constructor(pos) {
    this.pos = pos === undefined ? createVector(width / 2, height / 2) : pos;
    this.realPos = this.pos.copy();
    console.log(this.realPos);
  }

  setPos(pos) {
    this.pos = pos;
  }

  tick() {
    this.realPos.lerp(this.pos, 0.35);
  }

  show() {
    stroke(0);
    noFill();
    rect(this.realPos.x, this.realPos.y, 50, 50);
  }

}