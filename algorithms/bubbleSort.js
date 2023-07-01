export default (array) => {
  let i, j;
  let A = array;

  for (i = 0; i < A.length; i++) {
    for (j = A.length - 1; j >= i + 1; j--) {
      if (A[j] < A[j - 1]) {
        [A[j], A[j - 1]] = [A[j - 1], A[j]];
      }
    }
  }

  return A;
};
