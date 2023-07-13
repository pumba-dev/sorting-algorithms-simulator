import inserctionSort from "./inserctionSort.js";
import mergeSort from "./mergeSort.js";
import heapSort from "./heapSort.js";
import quickSortRnd from "./quickSortRnd.js";

export default function aohSort(A) {
  if (isSorted(A)) {
    return A;
  }
  if (isReverseSorted(A)) {
    if (A.length <= 150) {
      return inserctionSort(A);
    } else {
      return quickSortRnd(A);
    }
  } else {
    if (A.length <= 250) {
      return inserctionSort(A);
    } else {
      return quickSortRnd(A);
    }
  }
}

function isSorted(A) {
  const n = A.length;
  for (let i = 1; i < n; i++) {
    if (A[i] < A[i - 1]) {
      return false;
    }
  }
  return true;
}

function isReverseSorted(A) {
  const n = A.length;
  for (let i = 1; i < n; i++) {
    if (A[i] > A[i - 1]) {
      return false;
    }
  }
  return true;
}
