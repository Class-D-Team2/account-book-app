<template>
  <li class="transaction-item">
    <span class="transaction-details">
      <template v-if="transactionItem.type === 'income'">
        {{
          `${transactionItem.date} / ${mapType(
            transactionItem.type
          )} / ${mapIncomeCategory(transactionItem.category)} / ${
            transactionItem.memo
          } / ${transactionItem.amount}`
        }}
      </template>
      <template v-else-if="transactionItem.type === 'expense'">
        {{
          `${transactionItem.date} / ${mapType(
            transactionItem.type
          )} / ${mapExpenseCategory(transactionItem.category)} / ${
            transactionItem.memo
          } / ${transactionItem.amount}`
        }}
      </template>
    </span>
  </li>
</template>
<style scoped>
.transaction-item {
  display: flex;
  margin-bottom: 10px;
}
.transaction-details {
  flex: 1;
  margin-right: 10px;
  white-space: nowrap;
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
const incomeCategoryMapping = {
  a: '월급',
  b: '용돈',
  c: '금융소득',
  d: '기타',
};
function mapIncomeCategory(category) {
  return incomeCategoryMapping[category] || category;
}
const expenseCategoryMapping = {
  a: '식비',
  b: '교통비',
  c: '주거비',
  d: '기타',
};
function mapExpenseCategory(category) {
  return expenseCategoryMapping[category] || category;
}
</script>
