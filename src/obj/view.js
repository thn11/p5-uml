class View {
  constructor(origin) {
    this.pos = origin || createVector(0, 0);
    this.width = 0;
    this.height = 0;
    this.zoomLevel = 1;
    this.realMousePos = createVector(0,0);
    this.worldMouse = createVector(0,0);
    this.mousePos = createVector(0,0);
    this.dragEnabled = true;
  }


  anchorMouse() {
      this.mousePos = createVector(
          mouseX / this.zoom,
          mouseY / this.zoom
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
      const oldZoom = this.zoomLevel;
      if (delta !== undefined){
          this.zoomLevel += this.zoomLevel / (50 / delta);
      }
      const zoomDelta = this.zoomLevel - oldZoom;
      this.pos.sub(createVector(
          mouseX * zoomDelta,
          mouseY * zoomDelta
      ))
      console.log(this.pos);
  }

  tick() {
      this.worldMouse = createVector(
          mouseX/view.zoom - view.pos.x,
          mouseY/view.zoom - view.pos.y
      );

      this.height = height / this.zoom;
      this.width = width / this.zoom;


      if (mouseIsPressed && this.dragEnabled){
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
