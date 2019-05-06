class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }

  add(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (n instanceof Matrix) {
          this.data[i][j] += n.data[i][j];
        } else {
          this.data[i][j] += n;
        }
      }
    }
  }

  transpose() {
    let result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }
    this = result;
  }

  multiply(n) {
    // Scalar product
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= n;
      }
    }
  }

  print() {
    console.table(this.data);
  }

  static multiply(m, n) {
    if (m.cols !== n.rows) {
      console.log("Columns of A must match rows of B");
      return undefined;
    }

    let result = new Matrix(m.rows, n.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < m.cols; k++) { // or b.rows
          // Dot product
          sum += m.data[i][k] * n.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }


  static transpose(m) {
    let result = new Matrix(m.cols, m.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        result.data[j][i] = m.data[i][j];
      }
    }
    return result;
  }
}
