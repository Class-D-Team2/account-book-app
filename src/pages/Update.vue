<template>
  <div>
    <h1>Update Transaction</h1>
    <form @submit.prevent="updateTransaction">
      <div>
        <label for="date">Date:</label>
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
      <button @click="deleteTransaction">Delete</button>
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
        this.$router.push('/transactions'); // Redirect to home if transaction is not found
      }
    },
    async updateTransaction() {
      const store = useTransactionStore();
      await store.updateTransaction(this.transaction);
      this.$router.push('/transactions'); // Redirect to home after updating
    },
    // async deleteTransaction() {
    //   const store = useTransactionStore();
    //   try {
    //     await store.deleteTransaction(this.transactionItem.id);
    //   } catch (error) {
    //     console.error('Error deleting transaction:', error);
    //     alert('Error occurred while deleting the transaction.');
    //   }
    // },
    async deleteTransaction() {
      const store = useTransactionStore();
      await store.deleteTransaction(this.transaction);
      this.$router.push('/transactons');
    },
    goBack() {
      this.$router.go(-1);
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
