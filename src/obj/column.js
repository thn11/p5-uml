class Column {
  constructor(colour) {
    this.text = '';
    this.pos = createVector(0, 0);
    this.w = 50;
    this.h = 24;
    this.colour = colour !== undefined ? colour : color(200, 200, 200);
    this.dragObj = {
      pos: createVector(0, 0),
      dragging: false,
      setPos: pos => this.dragObj.pos = pos,
      target: null,
    };
    this.dragging = false;
    this.text = random([
      "id",
      "user_id",
      "company_id",
      "age",
      "name",
      "surname",
      "email",
      "password",
      "type",
    ]);
  }

  getDraggable(pos) {
    if (pos.dist(createVector(this.pos.x + this.w, this.pos.y + this.h / 2)) < 8) {
      connecting = true;
      return this.dragObj;
    }
    if (pos.x <= this.pos.x + this.w && pos.x >= this.pos.x) {
      if (pos.y <= this.pos.y + this.h && pos.y >= this.pos.y) {
        return this;
      }
    }
    return null;
  }

  setPos(pos) {
    this.pos.y = pos.y;
  }

  get realPos() {
    return this.pos;
  }

  tick(pos, w) {
    this.pos = pos;
    this.w = w;
  }


  PointWithDir(bounds, aDirection) {
    let e = bounds; // width & height
    let v = aDirection.normalize(); // direction
    let y = e.x * v.y / v.x;
    if (abs(y) < e.y) {
      const reverse = round(v.x / abs(v.x));
      return createVector((e.x + 1) * reverse, y * reverse);
    }
    const reverse = round(v.y / abs(v.y));
    return createVector((e.y * v.x / v.y + 1) * reverse, (e.y + 1) * reverse);
  }
  PointOnBounds(bounds, aAngle) {
    const a = aAngle;
    return this.PointWithDir(bounds, createVector(cos(a), sin(a)));
  }

  drawDot(x, y, w, h) {

    const rainbow = handler.connectColour;
    if (view.worldMouse.dist(createVector(x + w, y + h / 2)) < 8) {
      fill(this.colour.levels[0], this.colour.levels[1], this.colour.levels[2], 70);
      ellipse(x + w, y + h / 2, 18);
      fill(this.colour.levels[0], this.colour.levels[1], this.colour.levels[2], 100);
      ellipse(x + w, y + h / 2, 12);
    }
    if (this.dragObj.dragging) {
      fill(rainbow.levels[0], rainbow.levels[1], rainbow.levels[2], 70);
      ellipse(x + w, y + h / 2, 18);
      fill(rainbow.levels[0], rainbow.levels[1], rainbow.levels[2], 100);
      ellipse(x + w, y + h / 2, 12);
    }
    if (this.dragObj.target === null) {
      // fill(this.dragObj.dragging ? rainbow : this.colour);
      fill(200);
      ellipse(x + w, y + h / 2, 6);
    }
    if (this.dragObj.dragging) {
      stroke(rainbow);
      strokeWeight(2);
      line(x + w, y + h / 2, this.dragObj.pos.x, this.dragObj.pos.y);
      noStroke();
      fill(rainbow);
      ellipse(x + w, y + h / 2, 6);
    }
    if (this.dragObj.target !== null && !this.dragObj.dragging) {
      fill(this.dragObj.target.colour);
      ellipse(x + w, y + h / 2, 8);
      noFill();
      strokeWeight(3);
      stroke(this.dragObj.target.colour);
      const {
        target
      } = this.dragObj;
      const targetCentre = createVector(
        target.realPos.x + target.width / 2,
        target.realPos.y + target.height / 2
      );
      const fromPos = createVector(x + w, y + h / 2);
      const angle = targetCentre.copy().sub(fromPos).heading();
      const testTarget = targetCentre.copy()
        .sub(this.PointOnBounds(createVector(target.width / 2, target.height / 2), angle));
      const targetPos = createVector(
        targetCentre.x - tan(angle),
        targetCentre.y - tan(angle)
      );
      line(fromPos.x, fromPos.y, testTarget.x, testTarget.y);
    }
  }

  show() {
    const x = this.pos.x;
    const y = this.pos.y;
    const w = this.w;
    const h = this.h;

    strokeWeight(1);
    stroke(this.colour);
    fill(this.colour);

    line(x + 2, y, x + w, y);
    line(x + 2, y + h, x + w, y + h);
    rect(x, y, 2, h, 2, 0, 0, 2);
    line(x + w, y, x + w, y + 5.5);
    line(x + w, y + h, x + w, y + h - 6.5);
    noFill();
    arc(x + w, y + h / 2, 12, 12, HALF_PI, -HALF_PI)
    noStroke();
    fill(255);
    text(this.text, x + 7, y + 5, w - 12, h);
    this.drawDot(x, y, w, h);
  }
}