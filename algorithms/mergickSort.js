import { mergeDance } from "./mergeSort.js";
import inserctionSort from "./inserctionSort.js";
import bubbleSort from "./bubbleSort.js";
import mergeSort from "./mergeSort.js";
import heapSort from "./heapSort.js";
import quickSortRnd from "./quickSortRnd.js";

export default (A) => {
  const threshold = Math.floor(500);

  if (isSorted(A)) {
    return A;
  }
  if (isReverseSorted(A)) {
    return hybridSortHelper(A, 0, A.length - 1, threshold);
  } else {
    if (A.length <= 10) {
      return inserctionSort(A);
    } else if (A.length <= 100) {
      return mergeSort(A);
    } else if (A.length <= 1000) {
      return heapSort(A);
    } else {
      return hybridSortHelper(A, 0, A.length - 1, threshold);
    }
  }
};

const hybridSortHelper = (A, start, end, threshold) => {
  if (end - start + 1 <= threshold) {
    return quickSortRnd(A.slice(start, end + 1));
  } else {
    const mid = Math.floor((start + end) / 2);
    const left = hybridSortHelper(A, start, mid, threshold);
    const right = hybridSortHelper(A, mid + 1, end, threshold);
    return mergeDance(left, right);
  }
};

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
