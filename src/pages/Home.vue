<template>
  <v-container>
    <!-- 헤더 -->
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="mb-4">{{ currentMonth }} 지출</h2>
      </v-col>
    </v-row>

    <!-- 수입/지출/순수익 -->
    <v-row justify="center">
      <v-col cols="6" md="4">
        <v-card class="text-center">
          <v-card-title class="blue lighten-2 white--text"
            >총 수입</v-card-title
          >
          <v-card-text class="display-1">{{ monthlyIncome }}원</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="text-center">
          <v-card-title class="red lighten-2 white--text">총 지출</v-card-title>
          <v-card-text class="display-1">{{ monthlyExpense }}원</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="text-center">
          <v-card-title class="green lighten-2 white--text"
            >순수익</v-card-title
          >
          <v-card-text class="display-1">{{ netIncome }}원</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 지난달 지출 분석 차트 -->
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-card>
          <v-card-title class="blue lighten-2 white--text"
            >지난달 지출 분석</v-card-title
          >
          <v-card-text>
            <ChartComponent />
          </v-card-text>
          <span class="text-alarm">저번달보다 200000원 더 썼어요!!!</span>
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

const currentMonth = computed(() => {
  const now = new Date();
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return previousMonth.toLocaleString('default', { month: 'long' });
});
</script>

<style>
.text-alarm {
  font-weight: bold;
}

.mb-4 {
  font-weight: bold;
  font-family: fantasy;
}
</style>
