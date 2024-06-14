<template>
  <div>
    <h1>거래내역 추가</h1>
    <form @submit.prevent="addTransaction" class="transaction-form">
      <div v-if="alert" class="alert">{{ alertMessage }}</div>
      <div class="form-group">
        <label for="date" class="label">날짜:</label>
        <input
          type="date"
          v-model="transaction.date"
          id="date"
          class="input-field"
          required
        />
      </div>

      <div class="form-group">
        <label for="type" class="label">거래유형:</label>
        <select
          v-model="transaction.type"
          id="type"
          class="input-field"
          required
        >
          <option value="" disabled selected>거래유형을 선택하세요</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>

      <template v-if="transaction.type === 'income'">
        <div class="form-group">
          <label for="category" class="label">세부내역:</label>
          <select
            v-model="transaction.category"
            id="category"
            class="input-field"
            required
          >
            <option value="" disabled selected>세부내역을 선택하세요</option>
            <option value="a">월급</option>
            <option value="b">용돈</option>
            <option value="c">금융소득</option>
            <option value="d">기타</option>
          </select>
        </div>
      </template>

      <template v-if="transaction.type === 'expense'">
        <div class="form-group">
          <label for="category" class="label">세부내역:</label>
          <select
            v-model="transaction.category"
            id="category"
            class="input-field"
            required
          >
            <option value="" disabled selected>세부내역을 선택하세요</option>
            <option value="a">식비</option>
            <option value="b">교통비</option>
            <option value="c">주거비</option>
            <option value="d">기타</option>
          </select>
        </div>
      </template>

      <div class="form-group">
        <label for="amount" class="label">금액:</label>
        <input
          type="number"
          v-model="transaction.amount"
          id="amount"
          class="input-field"
          required
          placeholder="금액을 입력하세요"
        />
      </div>

      <div class="form-group">
        <label for="memo" class="label">세부사항:</label>
        <input
          type="text"
          v-model="transaction.memo"
          id="memo"
          class="input-field"
          required
          placeholder="세부사항을 입력하세요"
        />
      </div>

      <div class="button-group">
        <button type="submit" class="btn-submit">
          <font-awesome-icon icon="plus" />
          추가
        </button>
        <button type="button" @click="goBack">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTransactionStore } from '@/stores/transactions';

library.add(faPlus);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      transaction: {
        date: '',
        category: '',
        type: '',
        amount: '',
        memo: '',
      },
      alert: false,
      alertMessage: '',
    };
  },
  methods: {
    async addTransaction() {
      if (
        !this.transaction.date ||
        !this.transaction.type ||
        !this.transaction.category ||
        !this.transaction.amount
      ) {
        this.alertMessage = '모든 필수 항목을 입력해주세요.';
        this.alert = true;
        return;
      }

      const store = useTransactionStore();
      await store.addTransaction(this.transaction);
      this.$router.push('/transactions'); // 추가 후 홈으로 리디렉션
    },
    goBack() {
      this.$router.go(-1); // 뒤로 가기
    },
  },
};
</script>

<style scoped>
.transaction-form {
  max-width: 400px; /* 폼의 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
}

.form-group {
  margin-bottom: 1rem; /* 각 입력 필드 아래 여백 설정 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 가운데 정렬 */
}

.label {
  width: 100px; /* 레이블 너비 설정 */
  margin-right: 1rem; /* 레이블 오른쪽 여백 설정 */
}

.input-field {
  flex: 1; /* 입력 필드가 남은 공간 모두 차지하도록 설정 */
  padding: 0.5rem; /* 입력 필드 내 여백 설정 */
  border: 1px solid #ccc; /* 입력 필드 테두리 설정 */
  border-radius: 4px; /* 입력 필드 테두리 둥글게 설정 */
}

.button-group {
  margin-top: 1rem; /* 버튼 그룹 위 여백 설정 */
  text-align: right; /* 버튼을 오른쪽 정렬 */
}

.btn-submit {
  margin-left: 0.5rem; /* 추가 버튼 왼쪽 여백 설정 */
  padding: 0.5rem 1rem; /* 버튼 내 여백 설정 */
  font-size: 1rem; /* 버튼 내의 텍스트 크기 설정 */
  border: 1px solid #007bff; /* 버튼 테두리 설정 */
  background-color: #007bff; /* 버튼 배경색 설정 */
  color: white; /* 버튼 텍스트 색상 설정 */
  border-radius: 4px; /* 버튼 테두리 둥글게 설정 */
}

.btn-submit:hover {
  background-color: #0056b3; /* 마우스 호버 시 배경색 변경 */
  border-color: #0056b3; /* 마우스 호버 시 테두리 색상 변경 */
}

button {
  margin-left: 0.5rem; /* 버튼 사이 여백 설정 */
  padding: 0.5rem 1rem; /* 버튼 내 여백 설정 */
  font-size: 1rem; /* 버튼 내의 텍스트 크기 설정 */
  border: 1px solid #6c757d; /* 버튼 테두리 설정 */
  background-color: #6c757d; /* 버튼 배경색 설정 */
  color: white; /* 버튼 텍스트 색상 설정 */
  border-radius: 4px; /* 버튼 테두리 둥글게 설정 */
}

button:hover {
  background-color: #5a6268; /* 마우스 호버 시 배경색 변경 */
  border-color: #545b62; /* 마우스 호버 시 테두리 색상 변경 */
}

.alert {
  color: red; /* 경고 메시지 색상 */
  margin-bottom: 1rem; /* 경고 메시지 아래 여백 */
}
</style>
