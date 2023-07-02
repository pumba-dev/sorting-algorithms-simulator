export default (A) => {
  return quickSortRnd(A, 0, A.length - 1);
};

function quickSortRnd(A, p, r) {
  if (p < r) {
    const q = partitionRnd(A, p, r);
    quickSortRnd(A, p, q - 1);
    quickSortRnd(A, q + 1, r);
  }

  return A;
}

function partitionRnd(A, p, r) {
  const i = random(p, r);
  [A[p], A[i]] = [A[i], A[p]];
  return partition(A, p, r);
}

function partition(A, p, r) {
  const x = A[r];
  let i = p - 1;

  for (let j = p; j <= r - 1; j++) {
    if (A[j] <= x) {
      i += 1;
      [A[i], A[j]] = [A[j], A[i]];
    }
  }

  [A[i + 1], A[r]] = [A[r], A[i + 1]];

  return i + 1;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
