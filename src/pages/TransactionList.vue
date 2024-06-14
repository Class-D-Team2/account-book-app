<template>
  <h1>거래내역 조회</h1>
  <div class="filter-container">
    <div class="filter-group">
      <label for="transactionType">거래 유형:</label>
      <select id="transactionType" v-model="selectedType">
        <option value="all">전체</option>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>
    <div v-if="selectedType !== 'all'" class="filter-group">
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
    <div class="filter-group date-picker-container">
      <label for="startDate">기간:</label>
      <input
        type="date"
        id="startDate"
        v-model="startDate"
        @click="openDatePicker($event)"
      />
      <span> ~ </span>
      <input
        type="date"
        id="endDate"
        v-model="endDate"
        @click="openDatePicker($event)"
      />
    </div>
  </div>

  <div class="card">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Memo</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <TransactionItem
          v-for="transactionItem in filteredList"
          :key="transactionItem.id"
          :transactionItem="transactionItem"
        />
      </tbody>
    </table>
  </div>
</template>

<style>
/* General styling */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.scroll-container {
  height: 600px;
  overflow-y: auto;
  margin: auto;
}

.card {
  width: 100%;
  overflow-x: auto;
}

/* Filter section styling */
.filter-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.filter-group label {
  margin-right: 10px;
  font-weight: bold;
}

.filter-group input,
.filter-group select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer; /* Add this line */
}

/* Date picker specific styles */
.date-picker-container input {
  cursor: pointer; /* Add this line */
}

.date-picker-container input::-webkit-calendar-picker-indicator {
  cursor: pointer; /* Add this line */
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

/* Add alternating row colors with darker shades */
tbody tr:nth-child(odd) {
  background-color: #e6e6e6;
}
tbody tr:nth-child(even) {
  background-color: #cccccc;
}

.transaction-item:hover {
  background-color: #b3b3b3;
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

// Function to open date picker
const openDatePicker = (event) => {
  event.target.showPicker();
};
</script>
