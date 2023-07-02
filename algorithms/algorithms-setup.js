import inserctionSort from "./inserctionSort.js";
import bubbleSort from "./bubbleSort.js";
import mergeSort from "./mergeSort.js";
import heapSort from "./heapSort.js";
import quickSort from "./quickSort.js";

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
};
