<template>
  <div class="container">
    <h1>거래내용페이지</h1>
    <router-link to="/transactions/create">홈</router-link>
    <router-link to="/transactions">거래내용으로 이동</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useTransactionListStore } from './stores/account.js';

const transactionListStore = useTransactionListStore();
const fetchTransactionList = transactionListStore.fetchTransaction;
fetchTransactionList();
</script>
