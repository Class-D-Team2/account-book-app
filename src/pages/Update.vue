<template>
  <div>
    <h1>Update Transaction</h1>
    <form @submit.prevent="updateTransaction">
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="transaction.date" id="date" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <input type="text" v-model="transaction.category" id="category" required />
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input type="number" v-model="transaction.amount" id="amount" required />
      </div>
      <div>
        <label for="content">Content:</label>
        <input type="text" v-model="transaction.content" id="content" required />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { useTransactionStore } from '@/stores/transactions';

export default {
  data() {
    return {
      transaction: {
        id: '',
        date: '',
        category: '',
        amount: '',
        content: '',
      },
    };
  },
  created() {
    this.fetchTransaction();
  },
  methods: {
    fetchTransaction() {
      const transactionId = this.$route.params.id;
      console.log('URL Transaction ID:', transactionId);
      const store = useTransactionStore();
      const transaction = store.fetchTransactionById(parseInt(transactionId, 10));
      if (transaction) {
        this.transaction = { ...transaction };
        console.log('Transaction fetched:', this.transaction);
      } else {
        console.error(`Transaction with ID ${transactionId} not found`);
        this.$router.push('/'); // Redirect to home if transaction is not found
      }
    },
    updateTransaction() {
      const store = useTransactionStore();
      store.updateTransaction(this.transaction);
      console.log('Transaction updated:', this.transaction);
      this.$router.push('/'); // Redirect to home after updating
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for this component */
</style>
