import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

import axios from 'axios';

export const useTransactionListStore = defineStore('transactionList', () => {
  const BASEURI = '/api/transactions';
  const state = reactive({ transactionList: [] });
  const fetchTransaction = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        state.transactionList = response.data;
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };
  console.log(useTransactionListStore());
  const addTransaction = async ({ transaction }, successCallback) => {
    try {
      const payload = { transaction };
      const response = await axios.post(BASEURI, payload);
      if (response.status === 201) {
        state.transactionList.push({ ...response.data });
        successCallback();
      } else {
        alert('거래내용 추가 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };
  const updateTransaction = async (
    { date, id, type, category, amount, memo },
    successCallback
  ) => {
    try {
      const payload = { date, id, type, category, amount, memo };
      const response = await axios.put(BASEURI + `/${id}`, payload);
      if (response.status === 200) {
        let index = state.transactionList.findIndex(
          (transaction) => transaction.id === id
        );
        state.transactionList[index] = payload;
        successCallback();
      } else {
        alert('거래내용 변경 실패');
      }
    } catch (error) {
      alert('에러발생 :' + error);
    }
  };
  const deleteTransaction = async (id) => {
    try {
      const response = await axios.delete(BASEURI + `/${id}`);
      console.log(response.status, response.data);
      if (response.status === 200) {
        let index = state.transactionList.findIndex(
          (transaction) => transaction.id === id
        );
        state.transactionList.splice(index, 1);
      } else {
        alert('거래내용 삭제 실패');
      }
    } catch (error) {
      alert('에러발생:' + error);
    }
  };
  const toggleDone = async (id) => {
    try {
      let transaction = state.transactionList.find(
        (transaction) => transaction.id === id
      );
      let payload = { ...transaction };
      const response = await axios.put(BASEURI + `/${id}`, payload);
      console.log(response.status, response.data);
      if (response.status === 200) {
      } else {
        alert('거래내용 완료 변경 실패');
      }
    } catch (error) {
      alert('에러발생:' + error);
    }
  };
  const transactionList = computed(() => state.transactionList);
  // const isLoading = computed(() => state.isLoading);
  const transactionCount = computed(() => state.transactionList.length);

  console.log(transactionList.value);
  return {
    transactionList,
    // isLoading,
    transactionCount,
    fetchTransaction,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    toggleDone,
  };
});
