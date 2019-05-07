function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  return y * (1 - y);
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();

    this.learning_rate = 0.05;
  }

  feedForward(input_array) {
    // Generate hidden layer outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);

    // Generate output layer outputs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);
    return output.toArray();
  }

  train(inputs, targets) {
    // Generate hidden layer outputs
    inputs = Matrix.fromArray(inputs);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);

    // Generate output layer outputs
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);

    // Calculate output layer errors
    targets = Matrix.fromArray(targets);
    let output_errors = Matrix.subtract(targets, outputs);

    // Gradient descent
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);
    // Calculate output bias with deltas
    this.bias_o.add(gradients);

    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);
    this.weights_ho.add(weights_ho_deltas);

    // Calculate hidden layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradients = Matrix.map(hidden, dsigmoid);
    hidden_gradients.multiply(hidden_errors);
    hidden_gradients.multiply(this.learning_rate);
    // Calculate output bias with deltas
    this.bias_h.add(hidden_gradients);

    // Calculate input-hidden deltas
    let input_T = Matrix.transpose(inputs);
    let weights_ih_deltas = Matrix.multiply(hidden_gradients, input_T);
    this.weights_ih.add(weights_ih_deltas);
  }
}
