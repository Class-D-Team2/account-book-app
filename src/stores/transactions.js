import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
  }),
  actions: {
    fetchTransactionById(id) {
      return this.transactions.find(transaction => transaction.id === id);
    },
    addTransaction(newTransaction) {
      newTransaction.id = Date.now();
      this.transactions.push(newTransaction);
    },
    updateTransaction(updatedTransaction) {
      const index = this.transactions.findIndex(transaction => transaction.id === updatedTransaction.id);
      if (index !== -1) {
        this.transactions.splice(index, 1, updatedTransaction);
      }
    },
  },
});
