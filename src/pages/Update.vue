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
        <label for="memo">Memo:</label>
        <input type="text" v-model="transaction.memo" id="memo" required />
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
        memo: '',
      },
    };
  },
  created() {
    this.fetchTransaction();
  },
  methods: {
    async fetchTransaction() {
      const transactionId = this.$route.params.id;
      const store = useTransactionStore();
      const transaction = await store.fetchTransactionById(transactionId);
      if (transaction) {
        this.transaction = { ...transaction };
      } else {
        this.$router.push('/'); // Redirect to home if transaction is not found
      }
    },
    async updateTransaction() {
      const store = useTransactionStore();
      await store.updateTransaction(this.transaction);
      this.$router.push('/'); // Redirect to home after updating
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for this component */
</style>

<!-- <template>
  <div>
    <h1>Update Transaction</h1>
    <form @submit.prevent="updateTransaction">
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
        <label for="memo">memo:</label>
        <input type="text" v-model="transaction.memo" id="content" required />
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
        memo: '',
      },
    };
  },
  created() {
    this.fetchTransaction();
  },
  methods: {
    async fetchTransaction() {
      const transactionId = this.$route.params.id;
      const store = useTransactionStore();
      const transaction = await store.fetchTransactionById(transactionId);
      if (transaction) {
        this.transaction = { ...transaction };
      } else {
        this.$router.push('/'); // Redirect to home if transaction is not found
      }
    },
    async updateTransaction() {
      const store = useTransactionStore();
      await store.updateTransaction(this.transaction);
      this.$router.push('/'); // Redirect to home after updating
    },
  },
};
</script>
<style scoped>
/* Add any specific styles for this component */
</style> -->
