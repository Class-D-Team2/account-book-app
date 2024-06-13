import { defineStore } from 'pinia';
import axios from 'axios';
import { reactive } from 'vue';

export const useChartStore = defineStore({
  id: 'chart',
  state: () => ({
    chart: null,
    chartConfig: {
      type: 'pie',
      data: {
        labels: ['식비', '교통비', '공과금', '기타지출'],
        datasets: [
          {
            label: '이번달 지출 분석',
            data: [10, 20, 30, 40],
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
            text: 'Chart.js Pie Chart',
          },
        },
      },
    },
  }),
  // actions: {
  //   async fetchData() {
  //     try {
  //       const response = await axios.get('/api/transactions');
  //       const state = reactive({ transactions: [] });
  //       if (response.status === 200) {
  //         state.transactions = response.data;
  //       } else {
  //         alert('데이터 조회 실패');
  //       }

  //       console.log(state.transactions);

  //       const category = ['a', 'b', 'c', 'd'];
  //       const filtered = state.transactions
  //         .filter((transaction) => transaction.type === 'expense')
  //         .filter(
  //           (transaction) => transaction.date.substring(0, 7) === '2024-06'
  //         );
  //       console.log('!!!!!!!!', filtered);
  //       for (let i = 0; i < 4; i++) {
  //         let totalAmount = 0;
  //         filtered
  //           .filter((transaction) => transaction.category === category[i])
  //           .forEach((transaction) => {
  //             totalAmount += transaction.amount;
  //           });
  //         this.chartConfig.data.datasets[i].data = data.values;
  //       }
  //     } catch (error) {
  //       console.error('에러발생 :', error);
  //     }
  //   },
  // },
});
