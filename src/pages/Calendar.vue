<template>
  <h1 text-align="center">월간내역</h1>
  <div class="scroll-container">
    <div class="calender-container">
      <div class="calendar-header">
        <!-- 년도 출력 -->
        <div class="year">{{ year }}년</div>
        <!-- 월 출력과 이전/다음 달 버튼을 감싸는 div -->
        <div class="month-nav">
          <!-- 이전 달 버튼 -->
          <button @click="prevMonth">지난 달</button>
          <!-- 월 출력 -->
          <div class="month">{{ month }}월</div>
          <!-- 다음 달 버튼 -->
          <button @click="nextMonth">다음 달</button>
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
                  <li
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
                      {{
                        mapCategory(
                          transactionItem.type,
                          transactionItem.category
                        )
                      }}

                      {{ transactionItem.amount }}
                    </div>
                  </li>
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
      let currentDate = 1;

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
  },
};
</script>
<style scoped>
.scroll-container {
  height: 800px;
  width: 800px;
  overflow-y: auto;
  overflow-x: auto;
  margin: auto;
}

.calendar-container {
  /* width: 100%; 최대 너비 */
  overflow-y: auto;
  overflow-x: auto;
}

.calendar-header {
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

.calendar-table th,
.calendar-table td {
  width: 2em;
}

.calendar-table td {
  height: 2em;
  padding: 0;
}

.date-cell {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.5em;
}

.transaction-item {
  display: flex;
  margin-bottom: 10px;
}

/* .transaction-details {
  달력크기 조절 여기에서 실행
  /* flex: 1;
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  border: 2px solid black;
  padding: 5px;
  letter-spacing: 2px;
} */
</style>
