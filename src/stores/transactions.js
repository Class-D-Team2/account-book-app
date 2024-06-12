import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
  }),
  actions: {
    async fetchTransactionById(id) {
      try {
        const response = await axios.get(`/api/transactions/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching transaction:', error);
        return null;
      }
    },
    async addTransaction(newTransaction) {
      try {
        const response = await axios.post('/api/transactions', newTransaction);
        this.transactions.push(response.data);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    },
    async updateTransaction(updatedTransaction) {
      try {
        const response = await axios.put(`/api/transactions/${updatedTransaction.id}`, updatedTransaction);
        const index = this.transactions.findIndex(transaction => transaction.id === updatedTransaction.id);
        if (index !== -1) {
          this.transactions.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Error updating transaction:', error);
      }
    },
  },
});
