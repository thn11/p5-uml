class Column {
  constructor(colour) {
    this.text = '';
    this.h = 24;
    this.colour = colour !== undefined ? colour : color(200, 200, 200);
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

  tick() {

  }

  show(x, y, w) {
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
    if (view.worldMouse.dist(createVector(x + w, y + h / 2)) < 8) {
      fill(this.colour.levels[0], this.colour.levels[1], this.colour.levels[2], 70);
      ellipse(x + w, y + h / 2, 18);
      fill(this.colour.levels[0], this.colour.levels[1], this.colour.levels[2], 100);
      ellipse(x + w, y + h / 2, 12);
    }
    fill(this.colour);
    ellipse(x + w, y + h / 2, 6);
  }
}