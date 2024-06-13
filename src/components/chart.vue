<template>
  <div style="text-align: left">
    <canvas ref="chartCanvas" width="400" height="300"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useChartStore } from '@/stores/chartLogic.js';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'ChartComponent',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chart = new Chart(ctx, useChartStore().chartConfig);
    },
  },
});
</script>
