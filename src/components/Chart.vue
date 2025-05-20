<template>
  <div class="relative w-fit">
    <canvas id="chart"></canvas>
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <p class="text-center font-semibold text-lg text-neutral-600 whitespace-nowrap">
        {{ formatCurrency(formatByFrequency(grossIncome)) }}
      </p>
      <small class="text-small">gross income</small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { storeToRefs } from "pinia";
import { useTaxStore } from "@/store";

// Register plugins
Chart.register(...registerables);
Chart.register(ChartDataLabels);

const { result, grossIncome, displayFrequency } = storeToRefs(useTaxStore());

// Colors for pie sections
const colors = {
  netIncome: "#22c55e",   // green
  federal: "#ef4444",     // red
  cpp: "#3b82f6",         // blue
};

// Extract values from result safely
const netIncome = computed(() => result.value?.netIncome ?? 0);
const federalTax = computed(() => result.value?.federalTax ?? 0);
const cpp = computed(() => result.value?.cpp ?? 0);

// Frequency-based scaling
const formatByFrequency = (amount: number) => {
  return displayFrequency.value === "month"
    ? amount / 12
    : amount;
};

// Format currency nicely
const formatCurrency = (value: number) =>
  `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// Chart.js config
let chart: Chart;

const chartData = computed(() => ({
  labels: ["Net Income", "Federal Tax", "CPP"],
  datasets: [
    {
      data: [
        formatByFrequency(netIncome.value),
        formatByFrequency(federalTax.value),
        formatByFrequency(cpp.value),
      ],
      backgroundColor: [
        colors.netIncome,
        colors.federal,
        colors.cpp,
      ],
      hoverOffset: 4,
    },
  ],
}));

const chartOptions = computed(() => ({
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      textAlign: "center",
      formatter: (val, ctx) => {
        const total =
          formatByFrequency(netIncome.value) +
          formatByFrequency(federalTax.value) +
          formatByFrequency(cpp.value);
        const percentage = (val / total) * 100;
        return `${ctx.chart.data.labels?.[ctx.dataIndex]}\n${percentage.toFixed(1)}%`;
      },
      color: "#fff",
    },
    tooltip: {
      callbacks: {
        label: (item) => formatCurrency(item.raw as number),
      },
    },
  },
  responsive: true,
}));

// Watch for chart updates
watch(chartData, (newData) => {
  if (chart && newData.datasets.length) {
    newData.datasets.forEach((d, i) => {
      chart.data.datasets[i].data = d.data;
    });
    chart.update();
  }
});

// Mount chart
const buildChart = () => {
  const canvas = document.getElementById("chart") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  chart = new Chart(ctx, {
    type: "doughnut",
    data: chartData.value,
    options: chartOptions.value,
  });
  chart.update();
};

onMounted(buildChart);
</script>
