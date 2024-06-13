<template>
  <div>
    <h1>Add Transaction</h1>
    <form @submit.prevent="addTransaction">
      <div>
        <label for="date">날짜:</label>
        <input type="date" v-model="transaction.date" id="date" required />
      </div>
      <div>
        <label for="type">거래유형:</label>
        <select v-model="transaction.type" id="type" required>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>
      <template v-if="transaction.type === 'income'">
        <div>
          <label for="category">세부내역:</label>
          <select v-model="transaction.category" id="category" required>
            <option value="a">월급</option>
            <option value="b">용돈</option>
            <option value="c">금융소득</option>
            <option value="d">기타</option>
          </select>
        </div>
      </template>
      <template v-if="transaction.type === 'expense'">
        <div>
          <label for="category">세부내역:</label>
          <select v-model="transaction.category" id="category" required>
            <option value="a">식비</option>
            <option value="b">교통비</option>
            <option value="c">주거비</option>
            <option value="d">기타</option>
          </select>
        </div>
      </template>

      <div>
        <label for="amount">금액:</label>
        <input
          type="number"
          v-model="transaction.amount"
          id="amount"
          required
        />
      </div>
      <div>
        <label for="memo">세부사항:</label>
        <input type="text" v-model="transaction.memo" id="memo" required />
      </div>
      <button type="submit">추가</button>
      <button @click="goBack">취소</button>
    </form>
  </div>
</template>
<script>
import { useTransactionStore } from '@/stores/transactions';
export default {
  data() {
    return {
      transaction: {
        date: '',
        category: '',
        type: '',
        amount: '',
        memo: '',
      },
    };
  },
  methods: {
    async addTransaction() {
      const store = useTransactionStore();
      await store.addTransaction(this.transaction);
      this.$router.push('/transactions'); // Redirect to home after adding
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};

// const categoryMapping = {
//   income: [
//     { value: 'a', label: '월급' },
//     { value: 'b', label: '용돈' },
//     { value: 'c', label: '금융소득' },
//     { value: 'd', label: '기타' },
//   ],
//   expense: [
//     { value: 'a', label: '식비' },
//     { value: 'b', label: '교통비' },
//     { value: 'c', label: '주거비' },
//     { value: 'd', label: '기타' },
//   ],
// };
// const filteredCategories = computed(() => {
//   return selectedType.value === 'all'
//     ? []
//     : categoryMapping[selectedType.value] || [];
// });
</script>
<style scoped>
/* Add any specific styles for this component */
</style>
