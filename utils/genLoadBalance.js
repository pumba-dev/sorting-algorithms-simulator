export default {
  distributed: (size, min, max) => {
    const array = [];
    const step = (max - min) / (size - 1);

    for (let i = 0; i < size; i++) {
      const value = min + step * i;
      array.push(parseInt(value));
    }

    return array;
  },
  exponential: (size, min) => {
    const array = [];
    const firstMultiple = Math.pow(2, Math.ceil(Math.log2(min)));
    const base = 2;

    array.push(firstMultiple);
    for (let i = 1; i < size; i++) {
      const value = array[i - 1] * base;
      array.push(parseInt(value));
    }

    return array;
  },
};
