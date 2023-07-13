export default (A) => {
  let i, j;
  let comparisons = 0;

  for (i = 0; i < A.length; i++) {
    for (j = A.length - 1; j >= i + 1; j--) {
      if (A[j] < A[j - 1]) {
        [A[j], A[j - 1]] = [A[j - 1], A[j]];
        comparisons++;
      }
      comparisons++;
    }
  }

  return { A, comparisons };
};
