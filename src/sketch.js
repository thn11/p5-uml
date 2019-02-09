let obj;
let view;
let oldMousePos;
let realMouseX;
let realMouseY;

// TODO: fix mouse paralax

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  obj = new Node(createVector(0, 0));
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
  //translate(-1 * (realMouseX / view.zoom), -realMouseY / view.zoom);
  //translate((view.pos.x - (realMouseX)) / view.zoom, (view.pos.y - (realMouseY)) / view.zoom);

  let NewRealMouseX = view.pos.x + (map(mouseX, 0, width, 0, width / view.zoom));
  let NewRealMouseY = view.pos.y + (map(mouseY, 0, height, 0, height / view.zoom));
  strokeWeight(10);
  stroke(255, 0, 0);
  point(mouseX, mouseY);
  stroke(128, 255, 0);
  point(mouseX / view.zoom, mouseY / view.zoom);
  stroke(255, 128, 0)
  point(NewRealMouseX, NewRealMouseY);
  stroke(0, 128, 255);
  point(width / 2, height / 2);
  strokeWeight(1);

  if (mouseIsPressed) {
    view.pos.sub(oldMousePos.sub(createVector(realMouseX, realMouseY)));
    oldMousePos = createVector(realMouseX, realMouseY);
  }
  obj.tick();
  obj.show();
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
  let oldZoom = view.zoom;
  if (e.delta < 0) {
    view.zoom += view.zoom / 100;
  } else {
    view.zoom -= view.zoom / 100;
  }

  // view.pos = createVector(
  //   view.pos.x + map(mouseX, 0, width, 0, deltaX),
  //   view.pos.y + map(mouseY, 0, width, 0, deltaY)
  // );

  let realMouseX = view.pos.x + (map(mouseX, 0, width, 0, width / oldZoom));
  let realMouseY = view.pos.y + (map(mouseY, 0, height, 0, height / oldZoom));

  let NewRealMouseX = view.pos.x + (map(mouseX, 0, width, 0, width / view.zoom));
  let NewRealMouseY = view.pos.y + (map(mouseY, 0, height, 0, height / view.zoom));

  let deltaX = realMouseX - NewRealMouseX;
  let deltaY = realMouseY - NewRealMouseY;

  view.pos.add(createVector(deltaX, deltaY));

  console.log(view.pos);
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