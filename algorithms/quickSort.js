export default (A) => {
  quickSort(A, 0, A.lenght - 1);
};

function quickSort(A, p, r) {
  if (p < r) {
    const q = partition(A, p, r);
    quickSort(A, p, q - 1);
    quickSort(A, q + 1, r);
  }

  return A;
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
