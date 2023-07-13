export default function mergeSort(A) {
  if (A.length <= 1) {
    return {
      A: A,
      comparisons: 1,
    };
  }

  const mid = Math.floor(A.length / 2);
  const left = A.slice(0, mid);
  const right = A.slice(mid);

  const leftResult = mergeSort(left);
  const rightResult = mergeSort(right);

  const mergedResult = mergeDance(leftResult.A, rightResult.A);
  const comparisons =
    leftResult.comparisons + rightResult.comparisons + mergedResult.comparisons;

  return {
    A: mergedResult.A,
    comparisons,
  };
}

export function mergeDance(left, right) {
  const mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;
  let comparisons = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    comparisons++;
    if (left[leftIndex] <= right[rightIndex]) {
      mergedArray.push(left[leftIndex]);
      leftIndex++;
      comparisons++;
    } else {
      mergedArray.push(right[rightIndex]);
      rightIndex++;
      comparisons++;
    }
  }

  while (leftIndex < left.length) {
    comparisons++;
    mergedArray.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    comparisons++;
    mergedArray.push(right[rightIndex]);
    rightIndex++;
  }

  return {
    A: mergedArray,
    comparisons,
  };
}
