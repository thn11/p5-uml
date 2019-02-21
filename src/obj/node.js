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
