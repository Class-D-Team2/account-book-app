<template>
  <nav class="sidebar">
    <span class="navbar-brand ps-2 fs-1">가계부</span>
    <div>
      <ul class="navbar-nav">
        <li>
          <!-- to에 있는 주소로 각각의 링크 생성해줌 -->
          <router-link class="nav-link" to="/">메인화면</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/transactions"
            >거래내역</router-link
          >
        </li>
        <!-- 달력 추가 -->
        <li>
          <router-link class="nav-link" to="/calendar">월간내역</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import { ref } from 'vue';
// const isNavShow = ref(false);
</script>

<style scoped>
.sidebar {
  width: 15em; /* 너비를 em 단위로 설정 */
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffb400; /* 사이드바 배경색 */
  overflow-x: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  padding-top: 1em;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.5em;
  padding-left: 1em; /* 왼쪽 여백 추가 */
}

/* 선택된 링크에 배경색 적용 */
.router-link-active {
  background-color: #54503c;
}
</style>
