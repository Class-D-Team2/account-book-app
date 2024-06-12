<template>
  <li class="transaction-item">
    <span class="transaction-details">
      {{
        `${transactionItem.date} / ${mapType(
          transactionItem.type
        )}/ ${mapCategory(transactionItem.category)} / ${
          transactionItem.memo
        }/ ${transactionItem.amount}`
      }}
    </span>
  </li>
</template>

<style>
.transaction-item {
  display: flex;
  margin-bottom: 10px;
}
.transaction-details {
  /* display: inline-block; */
  flex: 1;
  margin-right: 10px;
  /* width: calc(20% - 10px); */
  white-space: nowarp;
  overflow: hidden;
  border: 2px solid black;
  padding: 5px;
  letter-spacing: 2px;
}
</style>

<script setup>
defineProps({
  transactionItem: { type: Object, required: true },
});

const typeMapping = {
  income: '수입',
  expense: '지출',
};

function mapType(type) {
  return typeMapping[type] || type;
}
const categoryMapping = {
  a: '월급',
  b: '용돈',
  c: '금융소득',
  d: '기타',
};

function mapCategory(category) {
  return categoryMapping[category] || category;
}
</script>
