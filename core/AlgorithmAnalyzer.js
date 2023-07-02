import ArrayGen from "../utils/ArrayGen.js";
import genGraphic from "../utils/genGraphic.js";
import ProgressManager from "../utils/ProgressManager.js";

export default class AlgorithmAnalyzer {
  constructor(scenarioArray, algorithmsFnArray, labels, replications) {
    this.labels = labels;
    this.scenarioSizeArray = scenarioArray;
    this.replications = replications;
    this.algorithmsFnArray = algorithmsFnArray;
    this.progressManager = new ProgressManager(
      scenarioArray.length * algorithmsFnArray.length * replications * 3,
      2000
    );
  }

  /**
   * It calculates the execution time of all algorithms and generates
   * an image that compares their performances for different scenarios.
   */
  initSimulation() {
    let randomData = [];
    let increasingData = [];
    let decreasingData = [];
    const xAxisLabels = this.scenarioSizeArray.map((size) => `${size}`);
    const randomScenarioArray = this.scenarioSizeArray.map((size) => {
      return ArrayGen.random(size);
    });
    const incScenarioArray = this.scenarioSizeArray.map((size) => {
      return ArrayGen.inc(size);
    });
    const decScenarioArray = this.scenarioSizeArray.map((size) => {
      return ArrayGen.dec(size);
    });

    this.progressManager.startAnimation();

    this.algorithmsFnArray.forEach((algorithm, index) => {
      randomData.push({
        label: this.labels[index],
        data: this.startAlgSimulation(algorithm, randomScenarioArray),
      });

      increasingData.push({
        label: this.labels[index],
        data: this.startAlgSimulation(algorithm, incScenarioArray),
      });

      decreasingData.push({
        label: this.labels[index],
        data: this.startAlgSimulation(algorithm, decScenarioArray),
      });
    });

    // Generate Results and Save Images
    genGraphic(randomData, xAxisLabels, "random-scenario-comparison.png");
    genGraphic(
      increasingData,
      xAxisLabels,
      "increasing-scenario-comparison.png"
    );
    genGraphic(
      decreasingData,
      xAxisLabels,
      "decreasing-scenario-comparison.png"
    );
  }

  /**
   * For each scenario the calculation of the algorithm's execution time is
   * replicated in order to obtain a list of the average performance of the algorithm.
   *
   * @param algorithmFn - Algorithm to test performance.
   * @param scenarioArray - Array of scenarios.
   * @returns Array of the average performance of the algorithm.
   */
  startAlgSimulation(algorithmFn, scenarioArray) {
    let data = [];

    scenarioArray.forEach((scenario) => {
      let totalPerformance = 0;
      for (let i = 0; i < this.replications; i++) {
        totalPerformance += this.calcAlgorithmPerformance(
          algorithmFn,
          scenario
        );
      }
      const averagePerformance = totalPerformance / this.replications;
      data.push(averagePerformance);
    });

    return data;
  }

  /**
   * Calculates the performance of the algorithm for the array as parameter.
   *
   * @param algorithmFn - Algorithm to test performance.
   * @param scenario - Scenario Array.
   * @returns Algorithm runtime.
   */
  calcAlgorithmPerformance(algorithmFn, scenario) {
    const scenarioDeepCopy = [].concat(scenario); // Deep Copy

    const startTime = performance.now();
    algorithmFn(scenarioDeepCopy);
    const endTime = performance.now();

    this.progressManager.updateProgress();

    const executionTime = endTime - startTime;
    return executionTime;
  }
}
