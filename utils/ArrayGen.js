import ArrayGen from "./ArrayGen.js";

export default {
  inc: (size) => {
    let array = new Array();
    for (let i = 1; i <= size; i++) {
      array.push(i);
    }
    return array;
  },
  dec: (size) => {
    let array = new Array();
    for (let i = size; i >= 1; i--) {
      array.push(i);
    }
    return array;
  },
  random: (size) => {
    let array = ArrayGen.dec(size);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
};
