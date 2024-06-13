<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
import { usePeriodCostStore } from '@/stores/periodCost';

const periodCostStore = usePeriodCostStore();
const fetchTransactions = periodCostStore.fetchTransactions;
fetchTransactions();
</script>
