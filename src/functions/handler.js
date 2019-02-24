class Handler {
  constructor() {
    this.tables = [];
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