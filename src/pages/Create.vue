<template>
  <div>
    <h1>Add Transaction</h1>

    <!-- prevent the default from submission and calls the addTransaction method when summited-->
    <form @submit.prevent="addTransaction">
      <div>
        
        <!-- A label for the date input -->
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
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
// imports the store function to manage transactions
import { useTransactionStore } from '@/stores/transactions';

// exports the components
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
    // add new transaction and redirect to the homepage
    addTransaction() {
      const store = useTransactionStore();
      store.addTransaction(this.transaction);
      this.$router.push('/'); // Redirect to home after adding
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for this component */
</style>
