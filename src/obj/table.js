class Table {


  constructor(pos) {
    this.pos = pos === undefined ? createVector(map(random(), 0, 1, 0, width), map(random(), 0, 1, 0, height)) : pos;
    this.realPos = this.pos.copy();
    this.width = 100;
    this.height = 150;
  }

  setPos(pos) {
    this.pos = createVector(floor(pos.x), floor(pos.y));
  }

  posOver(pos) {
    if (pos.x <= this.realPos.x + this.width && pos.x >= this.realPos.x) {
      if (pos.y <= this.realPos.y + this.height && pos.y >= this.realPos.y) {
        return true;
      }
    }
    return false;
  }

  getOffset(pos) {
    return createVector(
      this.realPos.x - pos.x,
      this.realPos.y - pos.y
    )
  }

  tick() {
    this.realPos.lerp(this.pos, 0.35);
  }

  show() {
    noStroke();
    strokeWeight(2);
    fill(20, 20, 20, 160);
    rect(this.realPos.x, this.realPos.y, this.width, this.height, 5);
    fill(255, 128, 0, 255);
    rect(this.realPos.x, this.realPos.y, this.width, 24, 5, 5, 0);
    fill(255);
    text('users', this.realPos.x + 10, this.realPos.y + 5, this.width - 20, 24);
  }

}