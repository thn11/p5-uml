let obj;
let view;
let oldMousePos;

// TODO: fix mouse paralax

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    obj = new Node(createVector(width/2, height/2));
    view = {
        zoom: 1,
        pos: createVector(0,0),
    };
    oldMousePos = createVector(mouseX, mouseY);
}

function draw() {
    push();
    translate(width/2, height/2);
    scale(view.zoom);
    translate(view.pos.x - width/2, view.pos.y - height/2);
    background(255);
    if (mouseIsPressed){
        view.pos.sub(oldMousePos.sub(createVector(mouseX, mouseY)));
        oldMousePos = createVector(mouseX, mouseY);
    }
    obj.tick();
    obj.show();
    pop();
}

function mousePressed(e) {
    oldMousePos = createVector(mouseX, mouseY);
}

function mouseWheel(e) {
    if (e.delta < 0){
        view.zoom += view.zoom / 10;
    } else {
        view.zoom -= view.zoom / 10;
    }
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
