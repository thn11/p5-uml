class Table {


  constructor(pos) {
    this.pos = pos === undefined ? createVector(width / 2, height / 2) : pos;
    this.realPos = this.pos.copy();
    this.width = 50;
    this.height = 80;
    console.log(this.realPos);
  }

  setPos(pos) {
    this.pos = pos;
  }

  posOver(pos) {
    if (pos.x <= this.realPos.x + this.width && pos.x >= this.realPos.x){
      if (pos.y <= this.realPos.y + this.height && pos.y >= this.realPos.y){
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
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(this.realPos.x, this.realPos.y, this.width, this.height);
  }

}
