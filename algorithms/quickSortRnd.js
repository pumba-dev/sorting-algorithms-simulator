export default (A) => {
  return quickSortRnd(A, 0, A.length - 1);
};

function quickSortRnd(A, p, r) {
  let comparisons = 0;

  if (p < r) {
    comparisons++;

    const partition = partitionRnd(A, p, r);
    const left = quickSortRnd(A, p, partition.q - 1);
    const right = quickSortRnd(A, partition.q + 1, r);

    comparisons += partition.comparisons + left.comparisons + right.comparisons;
  }

  return { A, comparisons };
}

function partitionRnd(A, p, r) {
  const i = random(p, r);
  [A[p], A[i]] = [A[i], A[p]];
  return partition(A, p, r);
}

function partition(A, p, r) {
  let comparisons = 0;
  const x = A[r];
  let i = p - 1;

  for (let j = p; j <= r - 1; j++) {
    comparisons++;
    if (A[j] <= x) {
      i += 1;
      [A[i], A[j]] = [A[j], A[i]];
      comparisons++;
    }
  }

  [A[i + 1], A[r]] = [A[r], A[i + 1]];

  return { q: i + 1, comparisons };
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
