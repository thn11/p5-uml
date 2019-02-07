let obj;
let view;
let oldMousePos;
let realMouseX;
let realMouseY;

// TODO: fix mouse paralax

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    obj = new Node();
    view = {
        zoom: 1,
        pos: createVector(0,0),
    };
    oldMousePos = createVector(0,0);
}

function draw() {
    fixMouse();
    push();
    translate(view.pos.x, view.pos.y);
    scale(view.zoom);
    //translate(-1 * (realMouseX / view.zoom), -realMouseY / view.zoom);
    //translate((view.pos.x - (realMouseX)) / view.zoom, (view.pos.y - (realMouseY)) / view.zoom);
    background(255);
    if (mouseIsPressed){
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
    if (e.delta < 0){
        view.zoom += view.zoom / 100;
    } else {
        view.zoom -= view.zoom / 100;
    }
    deltaX =  (width / oldZoom) - (width / view.zoom);
    deltaY =  (height / oldZoom) - (height / view.zoom);
    view.pos = createVector(
        view.pos.x + map(mouseX, 0, width, 0, deltaX),
        view.pos.y + map(mouseY, 0, width, 0, deltaY)
    );

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
