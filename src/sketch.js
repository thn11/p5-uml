let obj;
let view;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  obj = new Node();
  view = new View();
  //frameRate(2);
}

function draw() {
  view.tick();
  push();
  scale(view.zoom);
  translate(view.pos.x, view.pos.y);
  background(51);
  obj.tick();
  obj.show();
  drawDots();
  strokeWeight(5);
  stroke(255, 128, 0);
  point(view.worldMouse.x, view.worldMouse.y);
  strokeWeight(1);
  stroke(0);
  pop();
}

function drawDots() {
  colorMode(HSB, 100);
  strokeWeight(4);
  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 30; j++) {
      stroke(map(i, 0, 60, 0, 100), map(j, 0, 30, 50, 100), 100);
      point(i * 20, j * 20);
    }
  }
  colorMode(RGB);
  strokeWeight(1);
}

function fixMouse() {
  realMouseX = mouseX / view.zoom;
  realMouseY = mouseY / view.zoom;

}

function mousePressed(e) {
  view.anchorMouse(mouseX, mouseY);
  view.dragEnabled = true;
}

function mouseReleased(e) {
  view.dragEnabled = false;
}


function mouseWheel(e) {
  view.zoom = e.delta < 0 ? 1 : -1;
}
