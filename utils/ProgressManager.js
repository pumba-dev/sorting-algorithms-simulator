import os from "os";
import SimulationConfigJSON from "../simulation-config.json" assert { type: "json" };

export default class ProgressManager {
  constructor(totalIterations, animationDelay) {
    this.totalIterations = totalIterations;
    this.animationDelay = animationDelay;
    this.progress = 0;
    this.animationInterval = null;
  }

  startAnimation() {
    this.animationInterval = setInterval(() => {
      this.updateProgress();
    }, this.animationDelay);
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
    this.animationInterval = null;
    this.progress = 0;
    console.clear();
  }

  updateProgress() {
    this.progress++;

    if (this.progress >= this.totalIterations) {
      this.stopAnimation();

      this.printRightsHeader();
      console.log(
        `!!!!!!!!!!!!!! Algoritmo Concluído com Sucesso :) !!!!!!!!!!!!!!`
      );
      this.printSystemInfo();
    } else {
      this.drawProgressAnimation();
    }
  }

  drawProgressAnimation() {
    const progressBarWidth = 47;
    const filledWidth = Math.ceil(
      (this.progress / this.totalIterations) * progressBarWidth
    );
    const emptyWidth = progressBarWidth - filledWidth;

    const progressBar = "#".repeat(filledWidth) + " ".repeat(emptyWidth);
    const progressPercentage = Math.ceil(
      (this.progress / this.totalIterations) * 100
    );

    console.clear();

    this.printRightsHeader();
    console.log(`Progress: [${progressBar}] ${progressPercentage}%`);
    this.printSystemInfo();
    this.printSimulationConfig();
  }

  printRightsHeader() {
    console.log(
      "================================================================"
    );
    console.log(
      `=========== Sorting Algorithm Performance Simulator ============`
    );
    console.log(
      `----------- By: Pumba Developer (www.pumbadev.com) -------------`
    );
    console.log(
      "================================================================"
    );
  }

  printSystemInfo() {
    const platform = os.platform();
    const release = os.release();
    const arch = os.arch();
    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;
    const totalMemory = Math.round(os.totalmem() / (1024 * 1024 * 1024));
    const freeMemory = Math.round(os.freemem() / (1024 * 1024 * 1024));

    console.log(
      "================================================================"
    );
    console.log(
      "######################### System Info ##########################"
    );
    console.log(
      "================================================================"
    );
    console.log("Arquitetura:", arch);
    console.log("Sistema Operacional:", platform);
    console.log("Versão do Sistema Operacional:", release);
    console.log("Modelo do Processador:", cpuModel);
    console.log("Núcleos do Processador:", cpuCores);
    console.log("Memória RAM Total (GB):", totalMemory);
    console.log("Memória RAM Livre (GB):", freeMemory);
    console.log(
      "================================================================"
    );
  }

  printSimulationConfig() {
    const { replications, loadBalances, balanceType, algorithms } =
      SimulationConfigJSON;

    console.log(
      "###################### Simulation Config #######################"
    );
    console.log("Replications:", replications);
    console.log("Load Balances:", loadBalances);
    console.log("Balance Type:", balanceType);
    console.log("Algorithms:", algorithms);
    console.log(
      "================================================================"
    );
  }
}
