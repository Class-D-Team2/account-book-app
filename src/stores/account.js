import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionList = defineStore('transactionList', () => {
  const BASEURI = './api/transactions';
  const state = reactive({ transactionList: [] });

  const addTransaction = async ({ transaction, desc }, successCallback) => {
    try {
      const payload = { transaction, desc };
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
    { date, id, transaction, desc, memo },
    successCallback
  ) => {
    try {
      const payload = { date, id, transaction, desc, memo };
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
  const isLoading = computed(() => state.isLoading);
  const transactionCount = computed(() => state.transactionList.length);

  return {
    transactionList,
    isLoading,
    transactionCount,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    toggleDone,
  };
});
