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
  background(255);

  let worldMouse = createVector(
    (mouseX - view.pos.x) / view.zoom,
    (mouseY - view.pos.y) / view.zoom
  );

  strokeWeight(8);
  stroke(255, 128, 0);
  point(worldMouse.x, worldMouse.y);
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
  let oldZoom = view.zoom;
  if (e.delta < 0) {
    view.zoom += view.zoom / 100;
  } else {
    view.zoom -= view.zoom / 100;
  }

  // calculate mouse position in current view
  // and subtract mouse position in new view
  // then subtract or add that to the position

  let oldMouseX = mouseX / oldZoom;
  let oldMouseY = mouseY / oldZoom;

  let newMouseX = mouseX / view.zoom;
  let newMouseY = mouseY / view.zoom;

  let deltaX = newMouseX - oldMouseX;
  let deltaY = newMouseY - oldMouseY;

  console.log({
    oldMouseX,
    oldMouseY,
    newMouseX,
    newMouseY,
    deltaX,
    deltaY
  });

  //view.pos.add(deltaX, deltaY);

  let viewWidth = width / view.zoom;
  let viewHeight = height / view.zoom;

  let mouse_true = createVector(mouseX / view.zoom + width, mouseY / view.zoom + height);
  let mouse_relative = createVector(viewWidth / mouseX, viewHeight / mouseY);
  let newPosX = mouse_true.x - viewWidth / mouse_relative.x;
  let newPosY = mouse_true.y - viewHeight / mouse_relative.y;

  //view.pos.lerp(createVector(width / 2 - mouseX, height / 2 - mouseY), 0.3);
  console.log(view.pos);

  // deltaX = (width / oldZoom) - (width / view.zoom);
  // deltaY = (height / oldZoom) - (height / view.zoom);
  // view.pos = createVector(
  //   view.pos.x + map(mouseX, 0, width, 0, deltaX),
  //   view.pos.y + map(mouseY, 0, width, 0, deltaY)
  // );

  console.log(view.zoom);
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
