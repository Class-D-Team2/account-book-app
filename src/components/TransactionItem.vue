<template>
  <tr class="transaction-item" @click="navigateToUpdate">
    <td>{{ transactionItem.date }}</td>
    <td>{{ mapType(transactionItem.type) }}</td>
    <td v-if="transactionItem.type === 'income'">
      {{ mapIncomeCategory(transactionItem.category) }}
    </td>
    <td v-else-if="transactionItem.type === 'expense'">
      {{ mapExpenseCategory(transactionItem.category) }}
    </td>
    <td>{{ transactionItem.memo }}</td>
    <td>{{ transactionItem.amount }}</td>
  </tr>
</template>

<style scoped>
.transaction-item {
  cursor: pointer;
}

.transaction-item:hover {
  background-color: #f9f9f9;
}
</style>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  transactionItem: { type: Object, required: true },
});

const router = useRouter();

const navigateToUpdate = () => {
  router.push(`/transactions/update/${props.transactionItem.id}`);
};

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
