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
    if (pos.x <= this.pos.x + width && pos.x >= this.pos.x){
      if (pos.y <= this.pos.y + height && pos.y >= this.pos.y){
        return true;
      }
    }
    return false;
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
