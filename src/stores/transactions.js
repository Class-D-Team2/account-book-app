import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
  }),
  actions: {
    fetchTransactionById(id) {
      console.log('Fetching transaction with ID:', id);
      console.log('Current transactions:', this.transactions);
      return this.transactions.find(transaction => transaction.id === id);
    },
    addTransaction(newTransaction) {
      newTransaction.id = Date.now(); // Generate a unique ID
      console.log('Adding transaction:', newTransaction);
      this.transactions.push(newTransaction);
    },
    updateTransaction(updatedTransaction) {
      const index = this.transactions.findIndex(transaction => transaction.id === updatedTransaction.id);
      if (index !== -1) {
        this.transactions.splice(index, 1, updatedTransaction);
        console.log('Updated transaction:', updatedTransaction);
      } else {
        console.error(`Transaction with ID ${updatedTransaction.id} not found for update`);
      }
    },
  },
});
