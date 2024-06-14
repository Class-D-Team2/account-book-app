import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import axios from 'axios';

export const usePeriodCostStore = defineStore('periodCost', () => {
  const BASEURI = '/api/transactions';
  const state = reactive({
    transactions: [],
    selectedMonth: 6, // 기본값은 6으로 설정
    totalMonths: 12,
  });

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status == 200) {
        state.transactions = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };

  const transactionList = computed(() => state.transactions);
  const monthlyExpense = computed(() => {
    const filtered = state.transactions
      .filter((transaction) => transaction.type === 'expense')
      .filter((transaction) => transaction.date.substring(0, 7) === '2024-05');
    let totalAmount = 0;
    filtered.forEach((transaction) => {
      totalAmount += transaction.amount;
    });

    return totalAmount;
  });

  const monthlyIncome = computed(() => {
    const filtered = state.transactions
      .filter((transaction) => transaction.type === 'income')
      .filter((transaction) => transaction.date.substring(0, 7) === '2024-05');
    let totalAmount = 0;
    filtered.forEach((transaction) => {
      totalAmount += transaction.amount;
    });
    return totalAmount;
  });

  const netIncome = computed(() => {
    const netIncome = monthlyIncome.value - monthlyExpense.value;
    return netIncome;
  });

  return {
    transactionList,
    monthlyExpense,
    monthlyIncome,
    netIncome,
    fetchTransactions,
    selectedMonth: ref(state.selectedMonth),
    totalMonths: state.totalMonths,
    setSelectedMonth(month) {
      state.selectedMonth = month;
    },
  };
});
