<template>
  <!-- <div class="container">
    <div class="row justify-content-center">
      <div class="col-1">
        <pagination
          v-model="selectedMonth"
          :total-visible="1"
          :length="totalMonths"
        ></pagination>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card">
          <div class="card-title">총 수입</div>
          <div class="card-text">{{ monthlyIncome }}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-title">총 지출</div>
          <div class="card-text">{{ monthlyExpense }}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-title">순수익</div>
          <div class="card-text">{{ netIncome }}</div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-title">저번달 지출 분석</div>
          <div class="card-text">
            <ChartComponent />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <router-link to="/transactions">
          <button
            class="btn btn-depressed btn-large"
            style="background-color: yellow; color: white"
          >
            <span>거래 내역 보기</span>
          </button>
        </router-link>
        <router-link to="/transactions/create">
          <button
            class="btn btn-depressed btn-large"
            style="background-color: yellow; color: white"
          >
            <span>거래 내역 추가</span>
          </button>
        </router-link>
      </div>
    </div>
  </div> -->
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title>{{ currentMonth }} 지출분석</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title>총 수입</v-card-title>
          <v-card-text>{{ monthlyIncome }}원</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>총 지출</v-card-title>
          <v-card-text>{{ monthlyExpense }}원</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>순수익</v-card-title>
          <v-card-text>{{ netIncome }}원</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" class="text-left">
        <v-card>
          <v-card-title>저번달 지출 분석</v-card-title>
          <v-card-text>
            <ChartComponent />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { usePeriodCostStore } from '@/stores/periodCost';
import ChartComponent from '@/components/chart.vue';

const periodCostStore = usePeriodCostStore();
const monthlyIncome = computed(() => periodCostStore.monthlyIncome);
const monthlyExpense = computed(() => periodCostStore.monthlyExpense);
const netIncome = computed(() => periodCostStore.netIncome);

import { ref } from 'vue';

const currentMonth = computed(() => {
  const now = new Date();
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return previousMonth.toLocaleString('default', { month: 'long' });
});
</script>
