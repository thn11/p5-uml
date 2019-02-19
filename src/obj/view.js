class View {
  constructor(origin) {
    this.pos = origin || createVector(0, 0);
    this.zoomLevel = 1;
  }

  get zoom() {
    return this.zoomLevel;
  }

  /**
   * zoom
   * delta (int) - negative number for zoom out, positive for zoom in
   */
  zoom(delta) {
    this.zoomLevel += this.zoomLevel / (50 / delta);
  }

  tick() {
    return null;
  }

}