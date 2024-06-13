<template>
  <div class="app-container">
    <Sidebar />
    <!-- 계속 페이지가 바뀌는 부분이 router-view -->
    <div class="contents">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { useTransactionListStore } from '@/stores/account.js';
const transactionListStore = useTransactionListStore();
const fetchTransactionList = transactionListStore.fetchTransaction;
fetchTransactionList();
</script>
<style>
.app-container {
  display: flex;
}
.contents {
  margin-left: 15em; /* 사이드바의 너비만큼 왼쪽 여백을 줌 */
  padding: 1em; /* 내용에 패딩을 추가 */
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  min-height: 100vh; /* 최소 높이를 뷰포트 높이로 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 요소의 전체 크기에 포함 */
}
</style>
