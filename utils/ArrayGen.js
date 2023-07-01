import ArrayGen from "./ArrayGen.js";

export default {
  inc: (size) => {
    let array = new Array();
    for (let i = 1; i <= size; i++) {
      array.push(i);
    }
    return JSON.parse(JSON.stringify(array));
  },
  dec: (size) => {
    let array = new Array();
    for (let i = size; i >= 1; i--) {
      array.push(i);
    }
    return JSON.parse(JSON.stringify(array));
  },
  random: (size) => {
    let array = ArrayGen.inc(size);
    for (let i = 0; i < size; i++) {
      let randomIndex = Math.floor(Math.random() * size);
      let temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return JSON.parse(JSON.stringify(array));
  },
};
