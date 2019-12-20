<template>
  <el-main>
    <el-table id="todo-summary" :data="tableData" style="width: 100%">
      <el-table-column prop="item" label="Item"></el-table-column>
      <el-table-column prop="count" label="Count" width="180"></el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import app from '@/utils/app';
export default {
  data() {
    return {};
  },
  computed: {
    tableData() {
      const self = this;
      const todos = self.$store.getters.getTodos;

      return [
        {
          item: 'Created todos',
          count: todos.length
        },
        {
          item: 'Completed todos',
          count: self.getCompletedTodosCount(todos)
        },
        {
          item: 'Current uncompleted todos',
          count: self.getCurrentTodosCount(todos, false)
        },
        {
          item: 'Current completed todos',
          count: self.getCurrentTodosCount(todos, true)
        }
      ];
    }
  },
  methods: {
    getCompletedTodosCount(todos) {
      let count = 0;

      if (!app.isNil(todos) && Array.isArray(todos)) {
        for (let index = 0; index < todos.length; index++) {
          if (todos[index].completed) ++count;
        }
      }

      return count;
    },
    getCurrentTodosCount(todos, completed) {
      const today = new Date();
      const todayDate = today.getDate();
      const todayMonth = today.getMonth() + 1;
      const todayYear = today.getFullYear();
      let startDate = new Date(
        `${todayYear}-${todayMonth < 10 ? '0' + todayMonth : todayMonth}-${
          todayDate < 10 ? '0' + todayDate : todayDate
        }`
      );

      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      startDate.setHours(0);
      startDate.setMinutes(0);

      let endDate = new Date(startDate);
      endDate = new Date(endDate.setDate(endDate.getDate() + 1));

      let count = 0;

      if (Array.isArray(todos)) {
        if (app.isNil(completed)) count = todos.length;
        else {
          for (let index = 0; index < todos.length; index++) {
            const todo = todos[index];
            const updated_on = new Date(todo.updated_on);

            if (
              todo.completed === completed &&
              updated_on >= startDate &&
              updated_on < endDate
            )
              ++count;
          }
        }
      }

      return count;
    }
  }
};
</script>
