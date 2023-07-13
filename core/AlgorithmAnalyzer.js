import ArrayGen from "../utils/ArrayGen.js";
import genGraphic from "../utils/genGraphic.js";
import ProgressManager from "../utils/ProgressManager.js";
import genLoadBalance from "../utils/genLoadBalance.js";

import SimulationConfigJSON from "../simulation-config.json" assert { type: "json" };
import algorithmsSetup from "../algorithms/algorithms-setup.js";
import unitTest from "../utils/unitTest.js";

export default class AlgorithmAnalyzer {
  constructor() {
    this.labels = [];
    this.replications = 0;
    this.scenarioSizeArray = [];
    this.algorithmsFnArray = [];
    this.progressManager = null;
    this.performanceYMax = 0;
    this.comparisonYMax = 0;
    this.initialize();
  }

  /**
   * It calculates the execution time of all algorithms and generates
   * an image that compares their performances for different scenarios.
   */
  initSimulation() {
    let randomData = [];
    let increasingData = [];
    let decreasingData = [];
    let randomComparisonData = [];
    let increasingComparisonData = [];
    let decreasingComparisonData = [];
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

    // Init Calculations of all algorithms performance
    this.algorithmsFnArray.forEach((algorithm, index) => {
      randomData.push({
        label: this.labels[index],
        data: this.startAlgSimulation(
          algorithm,
          randomScenarioArray,
          this.labels[index]
        ),
      });

      increasingData.push({
        label: this.labels[index],
        data: this.startAlgSimulation(
          algorithm,
          incScenarioArray,
          this.labels[index]
        ),
      });

      decreasingData.push({
        label: this.labels[index],
        data: this.startAlgSimulation(
          algorithm,
          decScenarioArray,
          this.labels[index]
        ),
      });
    });

    // Init Calculation of All Algorithms Comparison Counter
    this.algorithmsFnArray.forEach((algorithm, index) => {
      randomComparisonData.push({
        label: this.labels[index],
        data: this.startAlgComparisonCount(
          algorithm,
          randomScenarioArray,
          this.labels[index]
        ),
      });

      increasingComparisonData.push({
        label: this.labels[index],
        data: this.startAlgComparisonCount(
          algorithm,
          incScenarioArray,
          this.labels[index]
        ),
      });

      decreasingComparisonData.push({
        label: this.labels[index],
        data: this.startAlgComparisonCount(
          algorithm,
          decScenarioArray,
          this.labels[index]
        ),
      });
    });

    // Generate Results and Save Images
    // |-- Performance Count
    genGraphic(
      randomData,
      xAxisLabels,
      "random-scenario-performance",
      "Teste de Performance: Cenário Randomico",
      "ms",
      this.performanceYMax
    );
    genGraphic(
      increasingData,
      xAxisLabels,
      "increasing-scenario-performance",
      "Teste de Performance: Cenário Ordenado",
      "ms",
      this.performanceYMax
    );
    genGraphic(
      decreasingData,
      xAxisLabels,
      "decreasing-scenario-performance",
      "Teste de Performance: Cenário Inverso",
      "ms",
      this.performanceYMax
    );
    // |-- Comparisons Count
    genGraphic(
      randomComparisonData,
      xAxisLabels,
      "random-scenario-comparison",
      "Teste de Comparações: Cenário Randomico",
      "comp",
      this.comparisonYMax
    );
    genGraphic(
      increasingComparisonData,
      xAxisLabels,
      "increasing-scenario-comparison",
      "Teste de Comparações: Cenário Ordenado",
      "comp",
      this.comparisonYMax
    );
    genGraphic(
      decreasingComparisonData,
      xAxisLabels,
      "decreasing-scenario-comparison",
      "Teste de Comparações: Cenário Inverso",
      "comp",
      this.comparisonYMax
    );

    this.progressManager.updateProgress();
  }

  /**
   * For each scenario the calculation of the algorithm's execution time is
   * replicated in order to obtain a list of the average performance of the algorithm.
   *
   * @param algorithmFn - Algorithm to test performance.
   * @param scenarioArray - Array of scenarios.
   * @param algorithmName - Name of Algorithm.
   * @returns Array of the average performance of the algorithm.
   */
  startAlgSimulation(algorithmFn, scenarioArray, algorithmName) {
    let data = [];

    scenarioArray.forEach((scenario) => {
      let totalPerformance = 0.0;
      for (let i = 0; i < this.replications; i++) {
        const algPerformance = this.calcAlgorithmPerformance(
          algorithmFn,
          scenario,
          algorithmName
        );
        totalPerformance += algPerformance;
        // console.log(
        //   `${algorithmName} - ${scenario.length} : ${algPerformance}`
        // );
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
   * @param algorithmName - Name of Algorithm.
   * @returns Algorithm runtime.
   */
  calcAlgorithmPerformance(algorithmFn, scenario, algorithmName) {
    const scenarioDeepCopy = [].concat(scenario); // Deep Copy

    const startTime = performance.now();
    const { A } = algorithmFn(scenarioDeepCopy);
    const endTime = performance.now();

    unitTest(A, algorithmName);

    this.progressManager.updateProgress();

    const executionTime = endTime - startTime;
    return executionTime;
  }

  startAlgComparisonCount(algorithmFn, scenarioArray, algorithmName) {
    let data = [];

    scenarioArray.forEach((scenario) => {
      let totalComparison = this.calcAlgorithmComparisons(
        algorithmFn,
        scenario
      );
      // console.log("Total comparison: " + totalComparison);
      data.push(totalComparison);
    });

    return data;
  }

  calcAlgorithmComparisons(algorithmFn, scenario) {
    const scenarioDeepCopy = [].concat(scenario); // Deep Copy

    const { comparisons } = algorithmFn(scenarioDeepCopy);

    // this.progressManager.updateProgress();

    return comparisons;
  }

  /**
   * Read simulation config and initialize simulatior variables params.
   */
  initialize() {
    const {
      replications,
      loadBalances,
      minBalanceValue,
      maxBalanceValue,
      balanceType,
      algorithms,
      vector,
      performanceYMax,
      comparisonYMax,
    } = SimulationConfigJSON;

    this.replications = replications;
    this.performanceYMax = performanceYMax;
    this.comparisonYMax = comparisonYMax;

    switch (balanceType) {
      case "distributed":
        this.scenarioSizeArray = genLoadBalance.distributed(
          loadBalances,
          minBalanceValue,
          maxBalanceValue
        );
        break;
      case "exponential":
        this.scenarioSizeArray = genLoadBalance.exponential(
          loadBalances,
          minBalanceValue
        );
        break;
      case "preSelected":
        this.scenarioSizeArray = genLoadBalance.preSelected(vector);
        break;
    }

    this.labels = algorithms.map((algorithm) => {
      return algorithmsSetup[algorithm].label;
    });

    this.algorithmsFnArray = algorithms.map((algorithm) => {
      return algorithmsSetup[algorithm].function;
    });

    const arrayCases = 3;
    const graphIterations = 1;

    this.progressManager = new ProgressManager(
      this.scenarioSizeArray.length *
        this.algorithmsFnArray.length *
        replications *
        arrayCases +
        graphIterations,
      2000
    );

    // console.log("replications", this.replications);
    // console.log("scenarioSizeArray", this.scenarioSizeArray);
    // console.log("labels", this.labels);
    // console.log("algorithmsFnArray", this.algorithmsFnArray);
  }
}
