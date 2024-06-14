<template>
  <!-- <h1 text-align="center">월간내역</h1> -->
  <div class="scroll-container">
    <div class="calender-container">
      <div class="calendar-header">
        <!-- 년도 출력 -->
        <div class="year">{{ year }}년</div>
        <!-- 월 출력과 이전/다음 달 버튼을 감싸는 div -->
      </div>
      <div class="calendar-body">
        <div class="month-nav">
          <!-- 이전 달 버튼 -->
          <button @click="prevMonth">
            <span class="arrow">◀</span>
          </button>
          <!-- 월 출력 -->
          <div class="month fs-2">{{ month }}월</div>
          <!-- 다음 달 버튼 -->
          <button @click="nextMonth"><span class="arrow">▶</span></button>
        </div>
      </div>
      <table class="table table-bordered text-center calendar-table">
        <thead>
          <tr>
            <!-- 요일 헤더를 반복적으로 생성 -->
            <th v-for="(day, index) in days" :key="index">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- 주 단위로 반복하며 각 주의 날짜를 생성 -->
          <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <!-- 각 주의 날짜를 반복적으로 생성 -->
            <td v-for="(date, dateIndex) in week" :key="dateIndex">
              <div class="date-cell">{{ date }}</div>
              <ul>
                <!-- 날짜가 빈 값이 아닐 때만 거래 항목 표시 -->

                <template v-if="date !== ''">
                  <!-- <li
                    v-for="transactionItem in getTransactionsForDate(
                      year,
                      month,
                      date
                    )"
                    :key="transactionItem.id"
                    class="transaction-item"
                  >
                    <div class="transaction-details">
                      {{ mapType(transactionItem.type) }} /
                      {{ transactionItem.amount }}
                    </div>
                  </li> -->
                  <div
                    class="totalIncome"
                    v-if="getTotalIncomeForDate(year, month, date) != 0"
                  >
                    {{ '수입' }} {{ getTotalIncomeForDate(year, month, date) }}
                  </div>
                  <!-- {{ '수입' }} {{ getTotalIncomeForDate(year, month, date) }} -->
                  <div
                    class="totalOutcome"
                    v-if="getTotalExpenseForDate(year, month, date) != 0"
                  >
                    {{ '지출' }} {{ getTotalExpenseForDate(year, month, date) }}
                  </div>
                  <!-- {{ '지출' }} {{ getTotalExpenseForDate(year, month, date) }} -->
                </template>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Calendar',
  data() {
    return {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weeks: [],
      year: 2024,
      month: 6,
      transactions: [],
      incomeCategories: [],
      expenseCategories: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get('./db.json') // JSON 파일 경로에 맞게 수정해야 합니다.
        .then((response) => {
          this.incomeCategories = response.data.income_categories;
          this.expenseCategories = response.data.expense_categories;
          this.transactions = response.data.transactions;
          this.generateCalendar(this.year, this.month);
        })
        .catch((error) => {
          console.error('Error fetching JSON file', error);
        });
    },
    generateCalendar(year, month) {
      this.weeks = [];

      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

      let currentWeek = [];

      const lastDate = lastDay.getDate();

      for (let i = 0; i < firstDay.getDay(); i++) {
        currentWeek.push('');
      }

      for (let date = 1; date <= lastDate; date++) {
        currentWeek.push(date);

        if (currentWeek.length === 7) {
          this.weeks.push(currentWeek);
          currentWeek = [];
        }
      }

      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push('');
        }
        this.weeks.push(currentWeek);
      }
    },
    prevMonth() {
      if (this.month === 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month--;
      }
      this.generateCalendar(this.year, this.month);
    },
    nextMonth() {
      if (this.month === 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month++;
      }
      this.generateCalendar(this.year, this.month);
    },
    getTransactionsForDate(year, month, date) {
      if (!date || !this.transactions) return [];

      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(
        date
      ).padStart(2, '0')}`;
      return this.transactions.filter(
        (transaction) => transaction.date === formattedDate
      );
    },
    mapType(type) {
      return type === 'income' ? '수입' : '지출';
    },
    mapCategory(type, categoryId) {
      const categories =
        type === 'income' ? this.incomeCategories : this.expenseCategories;
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : '';
    },
    getTotalIncomeForDate(year, month, date) {
      const transactions = this.getTransactionsForDate(year, month, date);
      return transactions.reduce((totalIncome, transaction) => {
        if (transaction.type === 'income') {
          return totalIncome + transaction.amount;
        }
        return totalIncome;
      }, 0);
    },
    getTotalExpenseForDate(year, month, date) {
      const transactions = this.getTransactionsForDate(year, month, date);
      return transactions.reduce((totalExpense, transaction) => {
        if (transaction.type === 'expense') {
          return totalExpense + transaction.amount;
        }
        return totalExpense;
      }, 0);
    },
  },
};
</script>
<style scoped>
.scroll-container {
  height: 90vh;
  width: 80vw;
  overflow-y: auto;
  overflow-x: auto;
  margin: 0;
}

.calendar-container {
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
}
.calendar-body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
}

.year {
  margin-right: 1em;
}

.month-nav {
  display: flex;
  align-items: center;
}

.month-nav button {
  background: none;
  border: none;
  font-size: 1em;
  cursor: pointer;
  margin: 0 0.5em;
}

.calendar-table {
  width: 100%;
  table-layout: fixed;
}

.date-cell {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.5em;
  height: 10px;
}

.transaction-item {
  display: flex;
  /* margin-bottom: 10px; */
}

.totalIncome {
  color: red;
  /* 달력 개별 아이템 style -> 위치 수정, 색낄 조건문, 카테고리 별 아이콘? */
}

.totalOutcome {
  color: blue;
  /* 달력 개별 아이템 style -> 위치 수정, 색낄 조건문, 카테고리 별 아이콘? */
}
</style>
