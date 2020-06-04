class Program {
  showXOR() {
    console.log("XOR");
    var resultsXOR = [0, 1, 0, 1];
    console.log(resultsXOR);
    this.xorTraining(resultsXOR, 20000, true);
  }
  showXNOR() {
    console.log("XNOR");
    var resultsXNOR = [0, 0, 1, 0];
    console.log(resultsXNOR);
    this.xorTraining(resultsXNOR, 20000, false);
  }
  log(x) {
    console.log(x);
  }
  xorTraining(data, epochs, xor) {
    var operation;
    xor == true ? (operation = "XOR") : (operation = "XNOR");
    var inputs = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
    ];
    var results = data;
    var neuron1 = new Neuron();
    var neuron2 = new Neuron();
    var neuronOut = new Neuron();
    neuron1.RandomWeight();
    neuron2.RandomWeight();
    neuronOut.RandomWeight();

    var epoch = 0;
    while (epoch < epochs) {
      epoch++;
      console.log("Generation: " + epoch);
      for (let i = 0; i < 4; i++) {
        neuron1.inputs = [inputs[i][0], inputs[i][1]];
        neuron2.inputs = [inputs[i][0], inputs[i][1]];
        neuronOut.inputs = [neuron1.output, neuron2.output];
        console.log(
          inputs[i][0] +
            " " +
            operation +
            " " +
            inputs[i][1] +
            " = " +
            neuronOut.output
        );
        neuronOut.err =
          derivitive(neuronOut.output) * (results[i] - neuronOut.output);

        neuronOut.CorrectWeight();
        neuron1.err =
          derivitive(neuron1.output) * neuronOut.err * neuronOut.weights[0];
        neuron2.err =
          derivitive(neuron2.output) * neuronOut.err * neuronOut.weights[1];

        neuron1.CorrectWeight();
        neuron2.CorrectWeight();
      }
    }
  }
}

class Neuron {
  inputs = [];
  weights = ["", ""];
  err;
  biasWeight;

  get output() {
    return sigmoid(
      this.weights[0] * this.inputs[0] +
        this.weights[1] * this.inputs[1] +
        this.biasWeight
    );
  }
  RandomWeight() {
    this.weights[0] = Math.random() * (0.2 - 0.1) + 0.1;
    this.weights[1] = Math.random() * (0.2 - 0.1) + 0.1;
    this.biasWeight = Math.random() * (0.2 - 0.1) + 0.1;
  }
  CorrectWeight() {
    this.weights[0] += this.err * this.inputs[0];
    this.weights[1] += this.err * this.inputs[1];
    this.biasWeight += this.err;
  }
}
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
function derivitive(x) {
  return x * (1 - x);
}
var ai = new Program();
ai.showXOR();
// ai.showXNOR();
