export default (result, name) => {
  if (result == undefined || result == null || result.constructor != Array) {
    console.log(`${name} - Result: `, result);
    throw new Error(`O algoritmo ${name} não retornou um resultado válido.`);
  } else {
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i] > result[i + 1]) {
        console.log(`${name} - Result: `, result);
        throw new Error(
          `O algoritmo ${name} não funcionou, retornou uma lista não ordenada.`
        );
      }
    }
  }
};
