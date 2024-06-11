<template>
  <div class="scroll-container">
    <div
      v-for="transactionItem in transactionList"
      :key="transactionItem.id"
      @click="updateTransactionList"
    >
      {{ transaction.transaction }}
    </div>
  </div>
</template>
<style>
.scroll-container {
  height: 400px;
  overflow-y: auto;
}
</style>

<script setup>
import { useTransactionList } from '@/stores/account.js';
import { computed } from 'vue';
import TransactionItem from '@/components/TransctionItem.vue';

const transactionStore = useTransactionList();
const { updateTransactionList } = transactionListstore;
const transactionList = computed(
  () => transactionStoreListStroe.transactionList
);
</script>
