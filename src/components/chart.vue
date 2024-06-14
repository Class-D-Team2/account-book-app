<template>
  <div>
    <canvas ref="chartCanvas" width="500" height="500"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useChartStore } from '@/stores/chartLogic.js';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'ChartComponent',
  mounted() {
    this.fetchDataAndRenderChart();
  },
  methods: {
    async fetchDataAndRenderChart() {
      await useChartStore().fetchDataAndRenderChart();
      this.initChart();
    },
    initChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chart = new Chart(ctx, useChartStore().chartConfig);
    },
  },
});
</script>
