<template>
  <div class="scroll-container">
    <div>
      <label for="transactionType">거래 유형:</label>
      <select id="transactionType" v-model="selectedType">
        <option value="all">전체</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>
    <div v-if="selectedType !== 'all'" class="category-container">
      <label for="transactionCategory">카테고리:</label>
      <select id="transactionCategory" v-model="selectedCategory">
        <option value="all">전체</option>
        <option
          v-for="category in filteredCategories"
          :key="category.value"
          :value="category.value"
        >
          {{ category.label }}
        </option>
      </select>
    </div>
    <div class="date-picker-container">
      <!-- 기간 선택 필드 -->
      <label for="startDate">기간:</label>
      <input type="date" id="startDate" v-model="startDate" />
      <span> ~ </span>
      <input type="date" id="endDate" v-model="endDate" />
    </div>

    <div class="card">
      <ul>
        <router-link
          v-for="transactionItem in filteredList"
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
      추가
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
.date-picker-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.date-picker-container label {
  margin-right: 10px;
}
.date-picker-container input {
  margin-left: 5px;
  margin-right: 5px;
}

.category-container {
  margin-bottom: 10px;
}
</style>

<script setup>
import { useTransactionListStore } from '@/stores/account.js';
import { computed, ref } from 'vue';
import TransactionItem from '@/components/TransactionItem.vue';

const transactionListStore = useTransactionListStore();
const transactionList = computed(() => transactionListStore.transactionList);
const selectedType = ref('all');
const selectedCategory = ref('all');
const startDate = ref('');
const endDate = ref('');

const categoryMapping = {
  income: [
    { value: 'a', label: '월급' },
    { value: 'b', label: '용돈' },
    { value: 'c', label: '금융소득' },
    { value: 'd', label: '기타' },
  ],
  expense: [
    { value: 'a', label: '식비' },
    { value: 'b', label: '교통비' },
    { value: 'c', label: '주거비' },
    { value: 'd', label: '기타' },
  ],
};

const filteredCategories = computed(() => {
  return selectedType.value === 'all'
    ? []
    : categoryMapping[selectedType.value] || [];
});

const filteredList = computed(() => {
  return transactionList.value
    .filter((transactionItem) => {
      const matchesType =
        selectedType.value === 'all' ||
        transactionItem.type === selectedType.value;

      const matchesCategory =
        selectedCategory.value === 'all' ||
        transactionItem.category === selectedCategory.value;

      const matchesStartDate =
        !startDate.value ||
        new Date(transactionItem.date) >= new Date(startDate.value);
      const matchesEndDate =
        !endDate.value ||
        new Date(transactionItem.date) <= new Date(endDate.value);

      return (
        matchesType && matchesCategory && matchesStartDate && matchesEndDate
      );
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
});

const fetchTransactionList = transactionListStore.fetchTransaction;
fetchTransactionList();
</script>
