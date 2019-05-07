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
        // Random number between -1 and 1
        this.data[i][j] = Math.random() * 2 - 1;
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

  static transpose(m) {
    let result = new Matrix(m.cols, m.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        result.data[j][i] = m.data[i][j];
      }
    }
    m = result;
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.error("Rows and Cols of A must match B");
        return undefined;
      }
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let sum = 0;
          for (let k = 0; k < this.cols; k++) {
            sum += this.data[i][k] * n.data[k][j];
          }
          this.data[i][j] = sum;
        }
      }
    } else {
      // Scalar product
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  }

  map(func) {
    // Apply a function to every element of a matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let value = this.data[i][j];
        this.data[i][j] = func(value);
      }
    }
  }

  print() {
    console.table(this.data);
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  static map(matrix, func) {
    let result = new Matrix(matrix.rows, matrix.cols);

    // Element-wise function application
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let value = matrix.data[i][j];
        result.data[i][j] = func(value);
      }
    }
    return result;
  }

  static subtract(a, b) {
    let result = new Matrix(a.rows, a.cols);

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
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
