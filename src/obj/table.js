class Table {


  constructor(pos) {
    this.pos = pos === undefined ? createVector(map(random(), 0, 1, 0, width), map(random(), 0, 1, 0, height)) : pos;
    this.realPos = this.pos.copy();
    this.width = 130;
    this.height = 150;
    this.colour = color('hsb(' + round(random(360)) + ', 100%, 80%)');
    this.columns = [new Column(this.colour), new Column()];
    this.dragging = false;
    this.shouldGlow = false;
    const colnum = floor(random(5));
    for (let i = 0; i < colnum; i++) {
      this.columns.push(new Column());
    }
    this.text = random([
      "user",
      "company",
      "user_settings"
    ]);
  }

  setPos(pos) {
    this.pos = createVector(floor(pos.x), floor(pos.y));
  }

  getDraggable(pos) {
    for (let i = 0; i < this.columns.length; i++) {
      const coldrag = this.columns[i].getDraggable(pos);
      if (coldrag !== null && coldrag !== undefined) {
        return coldrag;
      }
    }
    if (pos.x <= this.realPos.x + this.width && pos.x >= this.realPos.x) {
      if (pos.y <= this.realPos.y + this.height && pos.y >= this.realPos.y) {
        return this;
      }
    }
    return null;
  }

  mouseOver(pos) {
    if (pos.x <= this.realPos.x + this.width && pos.x >= this.realPos.x) {
      if (pos.y <= this.realPos.y + this.height && pos.y >= this.realPos.y) {
        return true;
      }
    }
    return false;
  }

  get connecting() {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].dragObj.dragging) {
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

  resort() {
    const min = this.realPos.y + 20;
    const max = this.realPos.y + 30 * (this.columns.length) + 10;
    this.columns.map(c => {
      if (c.pos.y < min) {
        c.pos.y = min;
      } else if (c.pos.y > max) {
        c.pos.y = max;
      }
      return c;
    });
    this.columns.sort((a, b) => a.pos.y - b.pos.y);
  }

  removeSelfReferences() {
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i];
      if (column.dragObj.target !== null && column.dragObj.target === this) {
        column.dragObj.target = null;
      }
    }
  }

  tick() {
    this.realPos.lerp(this.pos, 0.35);
    this.height = 24 + 30 * this.columns.length + 8;
    this.columns.forEach((c, i) => c.tick(createVector(this.realPos.x + 5, this.realPos.y + 30 * (i + 1)), this.width - 10));
  }

  glow() {
    this.shouldGlow = true;
  }

  show() {
    if (this.shouldGlow) {
      noStroke();
      fill(this.colour.levels[0], this.colour.levels[1], this.colour.levels[2], 100);
      rect(this.realPos.x - 10, this.realPos.y - 10, this.width + 20, this.height + 20, 5);
      fill(this.colour.levels[0], this.colour.levels[1], this.colour.levels[2], 150);
      rect(this.realPos.x - 5, this.realPos.y - 5, this.width + 10, this.height + 10, 5);
      this.shouldGlow = false;
    }
    this.resort();
    stroke(this.colour);
    strokeWeight(2);
    fill(20, 20, 20, 160);
    rect(this.realPos.x, this.realPos.y, this.width, this.height, 5);
    noStroke();
    fill(this.colour);
    rect(this.realPos.x, this.realPos.y, this.width, 24, 5, 5, 0);
    fill(255);
    text(this.text, this.realPos.x + 10, this.realPos.y + 5, this.width - 20, 24);

    this.columns.filter(c => !c.dragging).forEach(c => c.show());
    const draggingCol = this.columns.find(c => c.dragging);
    draggingCol !== undefined ? this.columns.find(c => c.dragging).show() : null;
  }

}