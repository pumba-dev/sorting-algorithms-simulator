const insertionSort = (A, start, end) => {
  for (let i = start + 1; i <= end; i++) {
    const key = A[i];
    let j = i - 1;
    while (j >= start && A[j] > key) {
      A[j + 1] = A[j];
      j--;
    }
    A[j + 1] = key;
  }
};

const mergeSort = (A, start, end, threshold) => {
  if (end - start + 1 <= threshold) {
    insertionSort(A, start, end);
  } else {
    const mid = Math.floor((start + end) / 2);
    mergeSort(A, start, mid, threshold);
    mergeSort(A, mid + 1, end, threshold);
    merge(A, start, mid, end);
  }
};

const merge = (A, start, mid, end) => {
  const left = A.slice(start, mid + 1);
  const right = A.slice(mid + 1, end + 1);

  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      A[k] = left[i];
      i++;
    } else {
      A[k] = right[j];
      j++;
    }
    k++;
  }

  while (i < left.length) {
    A[k] = left[i];
    i++;
    k++;
  }

  while (j < right.length) {
    A[k] = right[j];
    j++;
    k++;
  }
};

export default (A) => {
  mergeSort(A, 0, A.length - 1, 100);
};
