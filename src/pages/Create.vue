<template>
  <div>
    <h1>Add Transaction</h1>
    <form @submit.prevent="addTransaction">
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="transaction.date" id="date" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <input
          type="text"
          v-model="transaction.category"
          id="category"
          required
        />
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input
          type="number"
          v-model="transaction.amount"
          id="amount"
          required
        />
      </div>
      <div>
        <label for="content">Content:</label>
        <input
          type="text"
          v-model="transaction.content"
          id="content"
          required
        />
      </div>
      <button type="submit">Add</button>
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
        amount: '',
        content: '',
      },
    };
  },
  methods: {
    async addTransaction() {
      const store = useTransactionStore();
      await store.addTransaction(this.transaction);
      this.$router.push('/'); // Redirect to home after adding
    },
  },
};
</script>
<style scoped>
/* Add any specific styles for this component */
</style>
