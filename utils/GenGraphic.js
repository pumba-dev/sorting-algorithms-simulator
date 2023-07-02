import { createCanvas } from "canvas";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import Chart from "chart.js/auto";
import { Colors } from "chart.js";

export default (data, labels, graphName) => {
  Chart.register(Colors);

  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: data,
    },
    options: {
      responsive: true,
      scales: {
        x: {
          scaleLabel: {
            display: true,
            labelString: "Tamanho do Array",
          },
        },
        y: {
          min: 0,
          max: 500,
          ticks: {
            callback: function (value) {
              return value + " ms";
            },
          },
        },
      },
    },
  });

  const resultDir = "./result";
  if (!existsSync(resultDir)) {
    mkdirSync(resultDir);
  }

  const outputPath = `${resultDir}/${graphName}`;
  const out = createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => {
    console.log(`Gráfico salvo em ${outputPath}`);
  });
};
