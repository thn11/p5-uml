class View {
  constructor(origin) {
    this.pos = origin || createVector(0, 0);
    this.width = 0;
    this.height = 0;
    this.zoomLevel = 1;
    this.realMousePos = createVector(0, 0);
    this.worldMouse = createVector(0, 0);
    this.mouseDelta = createVector(0, 0);
    this.mousePos = createVector(0, 0);
    this.dragEnabled = false;
  }

  apply() {
    scale(this.zoomLevel);
    translate(this.pos.x, this.pos.y);
  }

  unapply() {
    translate(-this.pos.x, -this.pos.y);
    scale(-this.zoomLevel);
  }


  anchorMouse() {
    this.mousePos = createVector(
      mouseX / this.zoomLevel,
      mouseY / this.zoomLevel
    );
  }

  get zoom() {
    return this.zoomLevel;
  }

  /**
   * zoom
   * delta (int) - negative number for zoom out, positive for zoom in
   */
  set zoom(delta) {
    // TODO: limit zoom

    if (delta < 0 && this.zoom < 0.05) {
      return null;
    }
    if (delta > 0 && this.zoom > 200) {
      return null;
    }

    if (!this.dragEnabled) {
      const oldZoom = this.zoomLevel;
      if (delta !== undefined) {
        this.zoomLevel += this.zoomLevel / (25 / delta);
      }

      let currentMousePos = createVector(
        mouseX / oldZoom - this.pos.x,
        mouseY / oldZoom - this.pos.y
      );

      let newMousePos = createVector(
        mouseX / this.zoom - this.pos.x,
        mouseY / this.zoom - this.pos.y
      );

      this.mouseDelta = currentMousePos.sub(newMousePos);

      this.pos = this.pos.sub(this.mouseDelta);
    }
  }

  tick() {
    // should run every loop
    this.worldMouse = createVector(
      mouseX / this.zoom - this.pos.x,
      mouseY / this.zoom - this.pos.y
    );

    this.height = height / this.zoom;
    this.width = width / this.zoom;


    if (mouseIsPressed && this.dragEnabled) {
      this.realMousePos = createVector(
        mouseX / this.zoom,
        mouseY / this.zoom
      );
      this.pos = this.pos.sub(this.mousePos.sub(this.realMousePos));
      this.mousePos = this.realMousePos.copy();
    }


    return null;
  }
}
