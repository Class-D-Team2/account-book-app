<template>
    <div>
      <h2>Transaction List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.category }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.content }}</td>
            <td>
              <router-link :to="`/update/${transaction.id}`">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { useTransactionStore } from '@/stores/transactions';
  
  export default {
    setup() {
      const store = useTransactionStore();
      return {
        transactions: store.transactions,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for this component */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  </style>
  