<template>
  <div class="scroll-container">
    <div class="calendar-container">
      <div class="calendar-header">
        <div class="year">{{ year }}년</div>
      </div>

      <div class="calendar-body">
        <div class="month-nav">
          <button @click="prevMonth">
            <span class="arrow">◀</span>
          </button>
          <div class="month fs-2">{{ month }}월</div>
          <button @click="nextMonth"><span class="arrow">▶</span></button>
        </div>
      </div>
      <table class="table table-bordered text-center calendar-table">
        <thead>
          <tr>
            <th v-for="(day, index) in days" :key="index">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <td v-for="(date, dateIndex) in week" :key="dateIndex">
              <div class="date-cell" v-if="date !== ''">
                {{ date }}
                <ul v-if="hasTransactions(year, month, date)">
                  <li
                    class="totalIncome"
                    v-if="getTotalIncomeForDate(year, month, date) > 0"
                  >
                    {{ '수입' }} {{ getTotalIncomeForDate(year, month, date) }}
                  </li>
                  <li
                    class="totalOutcome"
                    v-if="getTotalExpenseForDate(year, month, date) > 0"
                  >
                    {{ '지출' }} {{ getTotalExpenseForDate(year, month, date) }}
                  </li>
                </ul>
              </div>
              <div class="empty-cell" v-else>
                &nbsp;
                <!-- Non-breaking space to ensure the cell retains size -->
              </div>
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
      days: ['일', '월', '화', '수', '목', '금', '토'],
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
          console.error('JSON 파일 가져오기 오류', error);
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
    hasTransactions(year, month, date) {
      return this.getTransactionsForDate(year, month, date).length > 0;
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
  font-size: 50px;
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
  min-height: 100px; /* 최소 높이 설정 */
}

.empty-cell {
  min-height: 100px; /* 비어 있는 셀도 동일한 최소 높이로 설정 */
}

.totalIncome {
  color: red;
  font-style: 0.8em;
}

.totalOutcome {
  color: blue;
  font-style: 0.8em;
}
</style>
