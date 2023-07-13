export default (A) => {
  let comparisons = 0;

  for (let i = Math.floor(A.length / 2) - 1; i >= 0; i--) {
    comparisons++;
    comparisons += maxHeapify(A, A.length, i);
  }

  for (let i = A.length - 1; i > 0; i--) {
    comparisons++;
    [A[0], A[i]] = [A[i], A[0]];
    comparisons += maxHeapify(A, i, 0);
  }

  return { A, comparisons };
};

function maxHeapify(A, heapSize, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  let comparisons = 0;

  if (l < heapSize && A[l] > A[largest]) {
    comparisons++;
    largest = l;
  }

  if (r < heapSize && A[r] > A[largest]) {
    comparisons++;
    largest = r;
  }

  if (largest !== i) {
    comparisons++;
    [A[i], A[largest]] = [A[largest], A[i]];
    maxHeapify(A, heapSize, largest);
  }

  return comparisons;
}
