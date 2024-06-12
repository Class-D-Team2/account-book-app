<template>
  <div>
    <h2>Transaction List</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Memo</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.category }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.memo }}</td>
          <td><router-link :to="`/edit/${transaction.id}`">Edit</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useTransactionStore } from '@/stores/transactions';

export default {
  computed: {
    transactions() {
      const store = useTransactionStore();
      return store.transactions;
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for this component */
</style>
