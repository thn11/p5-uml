class Handler {
  constructor() {
    this.tables = [new Table(), new Table(), new Table()];
    this.dragging = null;
    this.dragOffset = createVector(0, 0);
  }

  addTable(pos) {
    this.tables = [new Table(pos), ...this.tables];
  }

  draggable() {
    for (let i = 0; i < this.tables.length; i++) {
      if (this.tables[i].posOver(view.worldMouse)) {
        this.dragging = this.tables[i];
        this.dragOffset = this.tables[i].getOffset(view.worldMouse);
        this.tables = [this.dragging, ...this.tables.filter((a, b) => {
          return b !== i;
        })];
        return true;
      }
    }
    return false;
  }

  releaseDrag() {
    this.dragging = null;
    this.dragOffset = createVector(0, 0);
  }

  tick() {
    for (let i = 0; i < this.tables.length; i++) {
      this.tables[i].tick();
    }
    if (this.dragging !== null) {
      this.dragging.setPos(view.worldMouse.add(this.dragOffset));
    }
  }

  show() {
    for (let i = this.tables.length - 1; i >= 0; i--) {
      this.tables[i].show();
    }
  }
}