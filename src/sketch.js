let obj;
let view;
let canvas;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  obj = new Node();
  view = new View();
}

function draw() {
  view.tick();
  push();
  view.apply();
  background(51);
  grid();
  obj.tick();
  obj.show();
  strokeWeight(3);
  stroke(255, 128, 0);
  point(view.worldMouse.x, view.worldMouse.y);
  strokeWeight(1);
  stroke(0);
  pop();
}

function grid() {
    stroke(255,128,0, 80);
    const tempSize = ceil(sqrt(ceil((1 / view.zoom) / 1)));
    const squareSize = pow(2, tempSize) * 50;
    strokeWeight(2/view.zoom);
    for (let i = 0; i <= view.width + squareSize; i+= squareSize){
        let x = floor((i - view.pos.x)/squareSize) * squareSize;
        line(x, -view.pos.y, x, view.height - view.pos.y);
    }
    for (let j = 0; j <= view.height + squareSize; j+= squareSize){
        let y = floor((j - view.pos.y)/squareSize) * squareSize;
        line(-view.pos.x, y, view.width - view.pos.x, y);
    }
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
  console.log(view.zoom);
}

window.onresize = function() {
  canvas.size(window.innerWidth, window.innerHeight);
  width = window.innerWidth;
  height = window.innerHeight;
}
