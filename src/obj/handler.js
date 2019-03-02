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
      const draggableObject = this.tables[i].getDraggable(view.worldMouse);
      if (draggableObject !== null) {
        this.dragging = draggableObject;
        console.log({
          draggableObject,
          isCol: draggableObject instanceof Column,
        });
        draggableObject.dragging = true;
        if (draggableObject instanceof Table || draggableObject instanceof Column) {
          console.log("Object is instanceof");
          this.dragOffset = draggableObject.realPos.copy().sub(view.worldMouse);
        }
        this.tables = [this.tables[i], ...this.tables.filter((a, b) => {
          return b !== i;
        })];
        return true;
      }
    }
    return false;
  }

  releaseDrag() {
    this.dragging.dragging = false;
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