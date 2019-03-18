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
        draggableObject.dragging = true;
        if (draggableObject instanceof Table || draggableObject instanceof Column) {
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

  attemptConnect() {
    if (connecting) {
      const target = this.tables.find(t => t.mouseOver(view.worldMouse));
      if (target !== undefined) {
        this.dragging.target = target;
        target.removeSelfReferences();
      } else {
        this.dragging.target = null;
      }
    }
  }

  releaseDrag() {
    this.attemptConnect();
    if (this.dragging) {
      this.dragging.dragging = false;
    }
    connecting = false;
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
    if (connecting) {
      const toGlow = this.tables.find(t => t.mouseOver(view.worldMouse));
      if (toGlow !== undefined && !toGlow.connecting) {
        toGlow.glow();
        this.connectColour = toGlow.colour;
      } else {
        this.connectColour = color('hsb(' + (frameCount * 2) % 360 + ', 100%, 100%)');
      }
    }
    for (let i = this.tables.length - 1; i >= 0; i--) {
      this.tables[i].show();
    }
  }
}