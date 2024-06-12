<template>
  <div class="scroll-container">
    <div class="card">
      <ul>
        <router-link to="/transaction/create  "
          ><TransactionItem
        /></router-link>
      </ul>
    </div>
  </div>
  <div>
    <router-link class="btn btn-primary" to="/transactions/create">
      할일추가
    </router-link>
  </div>
</template>
<style>
.scroll-container {
  height: 400px;
  overflow-y: auto;
  margin: auto;
}
</style>

<script setup>
import TransactionItem from '@/components/TransactionItem.vue';
</script>
