<template>
  <li>
    <span class="transaction-details">
      {{
        `${transactionItem.date} ${transactionItem.id} ${transactionItem.type} ${transactionItem.category} ${transactionItem.memo}`
      }}
    </span>
  </li>
</template>

<style>
.transaction-details {
  display: inline-block;
  margin-right: 10px;
  width: calc(20% - 10px);
  white-space: nowarp;
  overflow: hidden;
  border: 2px solid black;
  padding: 5px;
}
</style>

<script setup>
defineProps({
  transactionItem: { Type: Object, required: true },
});
</script>
