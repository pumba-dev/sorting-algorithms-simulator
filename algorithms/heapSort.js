export default (A) => {
  // Build Max Heap (A)
  for (let i = Math.floor(A.length / 2) - 1; i >= 0; i--) {
    maxHeapify(A, A.length, i);
  }

  for (let i = A.length - 1; i > 0; i--) {
    [A[0], A[i]] = [A[i], A[0]];
    maxHeapify(A, i, 0);
  }

  return A;
};

function maxHeapify(A, heapSize, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < heapSize && A[l] > A[largest]) {
    largest = l;
  }

  if (r < heapSize && A[r] > A[largest]) {
    largest = r;
  }

  if (largest !== i) {
    [A[i], A[largest]] = [A[largest], A[i]];
    maxHeapify(A, heapSize, largest);
  }
}
