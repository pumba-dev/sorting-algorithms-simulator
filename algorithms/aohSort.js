import heapSort from "./heapSort.js";
import inserctionSort from "./inserctionSort.js";
import quickSortRnd from "./quickSortRnd.js";

export default function aohSort(A) {
  let comparisons = 0;
  const size = A.length;

  if (size <= 500) {
    comparisons++;
    const inserction = inserctionSort(A);
    comparisons += inserction.comparisons;
    return { A: inserction.A, comparisons };
  } else if (size <= 900) {
    comparisons++;
    const heap = heapSort(A);
    comparisons += heap.comparisons;
    return { A: heap.A, comparisons };
  } else {
    comparisons++;
    const sorted = isSorted(A);
    comparisons += sorted.comparisons;

    if (sorted.value) {
      comparisons++;
      return { A, comparisons };
    } else {
      comparisons++;
      const quick = quickSortRnd(A);
      comparisons += quick.comparisons;
      return { A: quick.A, comparisons };
    }
  }
}

function isSorted(A) {
  let comparisons = 0;
  const n = A.length;
  for (let i = 1; i < n; i++) {
    comparisons++;
    if (A[i] < A[i - 1]) {
      comparisons++;
      return { value: false, comparisons };
    }
  }
  return { value: true, comparisons };
}
