import { defineStore } from 'pinia';
import axios from 'axios';
import { nextTick } from 'vue';

export const useChartStore = defineStore({
  id: 'chart',
  state: () => ({
    chartConfig: {
      type: 'pie',
      data: {
        labels: ['식비', '교통비', '공과금', '기타지출'],
        datasets: [
          {
            label: [],
            data: [],
            backgroundColor: ['red', 'yellow', 'green', 'blue'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '5월 지출내역',
          },
        },
      },
    },
  }),
  actions: {
    async fetchDataAndRenderChart() {
      try {
        const response = await axios.get('/api/transactions');
        if (response.status === 200) {
          const transactions = response.data;

          const category = ['a', 'b', 'c', 'd'];
          const filtered = transactions
            .filter((transaction) => transaction.type === 'expense')
            .filter(
              (transaction) => transaction.date.substring(0, 7) === '2024-05'
            );

          const newData = [];
          const percentData = [];
          for (let i = 0; i < 4; i++) {
            let totalAmount = 0;
            let total = 0;
            let percent = 0;

            filtered.forEach((transaction) => {
              total += transaction.amount;
            });

            filtered
              .filter((transaction) => transaction.category === category[i])
              .forEach((transaction) => {
                totalAmount += transaction.amount;
              });
            percent = Math.round((totalAmount / total) * 100) + '%';
            percentData.push(percent);
            newData.push(totalAmount);
          }

          this.updateChartData(percentData, newData);
        } else {
          alert('데이터 조회 실패');
        }
      } catch (error) {
        console.log('에러발생:', error);
      }
    },
    updateChartData(percentData, newData) {
      for (let i = 0; i < 4; i++) {
        if (
          this.chartConfig.data.labels[i].substring(
            this.chartConfig.data.labels[i].length - 1
          ) != '%'
        ) {
          this.chartConfig.data.labels[i] += ': ' + percentData[i];
        }
      }
      this.chartConfig.data.datasets[0].data = newData;
      nextTick(() => {
        // 차트 업데이트
        this.$refs.chart.update();
      });
    },
  },
});
