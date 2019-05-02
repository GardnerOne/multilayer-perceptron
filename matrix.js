class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.matrix = [];
    for (var i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }
  randomize() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }
  add(n) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (n instanceof Matrix) {
          this.matrix[i][j] += n.matrix[i][j];
        } else {
          this.matrix[i][j] += n;
        }
      }
    }
  }
  multiply(n) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (n instanceof Matrix) {
          this.matrix[i][j] *= n.matrix[i][j];
        } else {
          this.matrix[i][j] *= n;
        }
      }
    }
  }
}
