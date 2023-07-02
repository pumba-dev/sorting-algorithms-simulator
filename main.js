import AlgorithmAnalyzer from "./core/AlgorithmAnalyzer.js";

import inserctionSort from "./algorithms/inserctionSort.js";
import bubbleSort from "./algorithms/bubbleSort.js";
import mergeSort from "./algorithms/mergeSort.js";
import heapSort from "./algorithms/heapSort.js";
import quickSort from "./algorithms/quickSort.js";

// const arraySizes = [50];
const arraySizes = [100, 1000, 5000, 30000, 50000, 100000, 150000, 200000];
// const arraySizes = [
//   5000, 10000, 20000, 30000, 50000, 100000, 150000, 200000, 350000, 500000,
// ];
// const arraySizes = [50, 100, 250, 500, 1000, 1500, 2500, 3000, 4000, 5000];
const algorithmsArray = [
  inserctionSort,
  bubbleSort,
  mergeSort,
  heapSort,
  quickSort,
];
const graphLabels = ["Inserction", "Bubble", "Merge", "Heap", "Quick"];

const Simulator = new AlgorithmAnalyzer(
  arraySizes,
  algorithmsArray,
  graphLabels,
  1
);

Simulator.initSimulation();
