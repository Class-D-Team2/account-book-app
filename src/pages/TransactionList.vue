<template>
  <div class="scroll-container">
    <div class="card">
      <ul>
        <router-link
          v-for="transactionItem in transactionList"
          :key="transactionItem.id"
          :transactionItem="transactionItem"
          :to="`/transactions/update/${transactionItem.id}`"
          class="router-link"
          ><TransactionItem :transactionItem="transactionItem"
        /></router-link>
      </ul>
    </div>
  </div>
  <div>
    <router-link class="btn btn-primary" to="/transactions/create">
      할일추
    </router-link>
  </div>
</template>
<style>
.scroll-container {
  height: 400px;
  overflow-y: auto;
  margin: auto;
}

.router-link {
  text-decoration: none;
  color: inherit;
}

.router-link:visited,
.router-link:hover,
.router-link:active {
  color: inherit;
}
</style>

<script setup>
import { useTransactionListStore } from '@/stores/account.js';
import { computed } from 'vue';
import TransactionItem from '@/components/TransactionItem.vue';

const transactionListStore = useTransactionListStore();
const transactionList = computed(() => transactionListStore.transactionList);
</script>
