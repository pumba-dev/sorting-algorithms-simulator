export default (callback, params) => {
  const startTime = performance.now();
  callback(params);
  const endTime = performance.now();

  const executionTime = endTime - startTime;
  return executionTime;
};
