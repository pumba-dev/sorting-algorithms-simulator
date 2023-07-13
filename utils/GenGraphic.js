import { createCanvas } from "canvas";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import Chart from "chart.js/auto";
import { Colors } from "chart.js";

export default (data, labels, graphName, graphTitle, yAxisSufix, yAxisMax) => {
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
        x: {},
        y: {
          max: yAxisMax,
          ticks: {
            callback: function (value) {
              return value + " " + yAxisSufix;
            },
          },
        },
      },
      layout: {
        padding: 20,
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: graphTitle,
        },
      },
    },
  });

  const resultDir = "./result";
  if (!existsSync(resultDir)) {
    mkdirSync(resultDir);
  }

  const outputPath = `${resultDir}/${graphName}.png`;
  const out = createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => {
    console.log(`Gráfico salvo em: ${outputPath}`);
  });
};
