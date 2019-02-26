class Handler {
  constructor() {
    this.tables = [new Table()];
  }

  draggable() {
    for (let i = 0; i < this.tables.length; i++) {
      if (this.tables[i].posOver(view.realMousePos)){
        return true;
        console.log("adadda");
      }
    }
    return false;
  }

  tick() {
    for (let i = 0; i < this.tables.length; i++) {
      this.tables[i].tick();
    }
  }

  show() {
    for (let i = 0; i < this.tables.length; i++) {
      this.tables[i].show();
    }
  }
}
