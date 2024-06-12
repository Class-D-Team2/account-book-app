<template>
  <div>
    <h1>Home Page</h1>
    <router-link to="/create">Add Transaction</router-link>
    <TransactionList />
  </div>
</template>

<script>
import TransactionList from '../pages/TransactionList.vue';

export default {
  components: {
    TransactionList,
  },
};
</script>

<style scoped>
/* Add any specific styles for this component */
</style>
