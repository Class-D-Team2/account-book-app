<template>
  <!-- <li class="transaction-item">
    <span class="transaction-details">
      <div v-if="transactionItem.type === 'income'">
        {{
          `${transactionItem.date} / ${mapType(
            transactionItem.type
          )} / ${mapIncomeCategory(transactionItem.category)} / ${
            transactionItem.memo
          } / ${transactionItem.amount}`
        }}
      </div>
      <div v-else-if="transactionItem.type === 'expense'">
        {{
          `${transactionItem.date} / ${mapType(
            transactionItem.type
          )} / ${mapExpenseCategory(transactionItem.category)} / ${
            transactionItem.memo
          } / ${transactionItem.amount}`
        }}
      </div>
    </span>
  </li> -->

  <v-list-item>
    <v-list-item-content>
      <div v-if="transactionItem.type === 'income'">
        <span>{{ transactionItem.date }}</span>
        <span>{{ mapType(transactionItem.type) }}</span>
        <span>{{ mapIncomeCategory(transactionItem.category) }}</span>
        <span>{{ transactionItem.memo }}</span>
        <span>{{ transactionItem.amount }}</span>
      </div>
      <div v-else-if="transactionItem.type === 'expense'">
        <span>{{ transactionItem.date }}</span>
        <span>{{ mapType(transactionItem.type) }}</span>
        <span>{{ mapExpenseCategory(transactionItem.category) }}</span>
        <span>{{ transactionItem.memo }}</span>
        <span>{{ transactionItem.amount }}</span>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>
<style scoped>
.transaction-item {
  display: flex;
  width: 100%;
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

.transaction-item span {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
