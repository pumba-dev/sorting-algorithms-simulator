import inserctionSort from "./inserctionSort.js";
import bubbleSort from "./bubbleSort.js";
import mergeSort from "./mergeSort.js";
import heapSort from "./heapSort.js";
import quickSort from "./quickSort.js";
import quickSortRnd from "./quickSortRnd.js";
import aohSort from "./aohSort.js";
import insermergeSort from "./insermergeSort.js";
import mergickSort from "./mergickSort.js";

export default {
  INSERCTIONSORT: {
    label: "Inserction",
    function: inserctionSort,
  },
  BUBBLESORT: {
    label: "Bubble",
    function: bubbleSort,
  },
  MERGESORT: {
    label: "Merge",
    function: mergeSort,
  },
  HEAPSORT: {
    label: "Heap",
    function: heapSort,
  },
  QUICKSORT: {
    label: "Quick",
    function: quickSort,
  },
  QUICKSORTRND: {
    label: "Quick Rnd",
    function: quickSortRnd,
  },
  AOHSORT: {
    label: "AOH",
    function: aohSort,
  },
  INSERMERGE: {
    label: "Insert+Merge",
    function: insermergeSort,
  },
  MERGICK: {
    label: "Quick+Merge",
    function: mergickSort,
  },
};
