import ArrayGen from "./utils/ArrayGen.js";
import CalcPerformance from "./utils/CalcPerformance.js";
import GenGraphic from "./utils/GenGraphic.js";

import insertSort from "./algorithms/inserctionSort.js";
import bubbleSort from "./algorithms/bubbleSort.js";
import mergeSort from "./algorithms/mergeSort.js";
import heapSort from "./algorithms/heapSort.js";
import quickSort from "./algorithms/quickSort.js";

const arraySize = 100;

// |-- Calc Algorithms Perfomance
// | |-- Random Array Sort
const insertRndTime = CalcPerformance(insertSort, ArrayGen.random(arraySize));
const bubbleRndTime = CalcPerformance(bubbleSort, ArrayGen.random(arraySize));
const mergeRndTime = CalcPerformance(mergeSort, ArrayGen.random(arraySize));
const heapRndTime = CalcPerformance(heapSort, ArrayGen.random(arraySize));
const quickRndTime = CalcPerformance(quickSort, ArrayGen.random(arraySize));

// | |-- Increasing Array Sort
const insertIncTime = CalcPerformance(insertSort, ArrayGen.inc(arraySize));
const bubbleIncTime = CalcPerformance(bubbleSort, ArrayGen.inc(arraySize));
const mergeIncTime = CalcPerformance(mergeSort, ArrayGen.inc(arraySize));
const heapIncTime = CalcPerformance(heapSort, ArrayGen.inc(arraySize));
const quickIncTime = CalcPerformance(quickSort, ArrayGen.inc(arraySize));

// | |-- Decreasing Array Sort
const insertDecTime = CalcPerformance(insertSort, ArrayGen.dec(arraySize));
const bubbleDecTime = CalcPerformance(bubbleSort, ArrayGen.dec(arraySize));
const mergeDecTime = CalcPerformance(mergeSort, ArrayGen.dec(arraySize));
const heapDecTime = CalcPerformance(heapSort, ArrayGen.dec(arraySize));
const quickDecTime = CalcPerformance(quickSort, ArrayGen.dec(arraySize));

// |-- Generate Graphic Images
const labels = [
  "Inserction Sort",
  "Bubble Sort",
  "Merge Sort",
  "Heap Sort",
  "Quick Sort",
];
const randomData = [
  insertRndTime,
  bubbleRndTime,
  mergeRndTime,
  heapRndTime,
  quickRndTime,
];
const incData = [
  insertIncTime,
  bubbleIncTime,
  mergeIncTime,
  heapIncTime,
  quickIncTime,
];
const decData = [
  insertDecTime,
  bubbleDecTime,
  mergeDecTime,
  heapDecTime,
  quickDecTime,
];

GenGraphic(randomData, labels, "random-algorithms-comparison.png");
GenGraphic(incData, labels, "increasing-algorithms-comparison.png");
GenGraphic(decData, labels, "decreasing-algorithms-comparison.png");
