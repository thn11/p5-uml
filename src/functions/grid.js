function grid() {
  stroke(255, 128, 0, 80);
  const tempSize = ceil(sqrt(ceil((1 / view.zoom) / 1)));
  const squareSize = pow(2, tempSize) * 50;
  strokeWeight(2 / view.zoom);
  for (let i = 0; i <= view.width + squareSize; i += squareSize) {
    let x = floor((i - view.pos.x) / squareSize) * squareSize;
    line(x, -view.pos.y, x, view.height - view.pos.y);
  }
  for (let j = 0; j <= view.height + squareSize; j += squareSize) {
    let y = floor((j - view.pos.y) / squareSize) * squareSize;
    line(-view.pos.x, y, view.width - view.pos.x, y);
  }
}
