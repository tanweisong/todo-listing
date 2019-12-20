<template>
  <el-main>
    <el-row :gutter="20">
      <el-col id="main-container" :span="18" :offset="3">
        <div id="main-input-container">
          <el-input
            id="todo-name"
            placeholder="Please input"
            v-model="input"
          ></el-input>
          <el-button id="add-button" type="primary" @click="addTodo"
            >Add</el-button
          >
        </div>
        <div v-if="todos.length === 0" class="main-container-noitem">
          No items
        </div>
        <div
          v-else
          v-for="todo in todos"
          :key="todo.id"
          class="main-container-todo"
        >
          <el-checkbox :value="todo.completed" @change="toggleChecked(todo)">{{
            todo.name
          }}</el-checkbox>
          <i class="el-icon-close todoDelete" @click="deleteTodo(todo.id)"></i>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import app from '@/utils/app';
import TodosService from '@/services/TodosService';

export default {
  name: 'home',
  data() {
    return {
      input: '',
      timer: null
    };
  },
  computed: {
    todos() {
      const self = this;

      return self.$store.getters.getTodos;
    }
  },

  methods: {
    async addTodo() {
      const self = this;
      const input = self.input;

      if (!app.isNil(input) && !app.isEqual(input.trim(), '')) {
        const todos = await TodosService.addTodo({
          name: input,
          completed: 0,
          created_on: new Date().getTime()
        });

        self.$store.dispatch('setTodos', todos);

        self.input = '';
      }
    },
    async deleteTodo(id) {
      const self = this;

      if (!app.isNil(id) && !app.isEqual(String(id).trim(), '')) {
        const todos = await TodosService.deleteTodo(id);

        self.$store.dispatch('setTodos', todos);
      }
    },
    toggleChecked(todo) {
      const self = this;
      let timer = self.timer;

      if (!app.isNil(todo)) {
        todo.completed = !todo.completed;

        if (!app.isNil(timer)) {
          clearInterval(timer);
        }

        self.timer = setInterval(function() {
          self.updateTodos();
          clearInterval(self.timer);
        }, 500);
      }
    },
    async updateTodos() {
      const self = this;
      let todos = self.todos;
      let changedTodos = [];

      for (let index = 0; index < todos.length; index++) {
        var todo = todos[index];
        const completed = todo.completed;
        const initialCompleted = todo.initialCompleted;

        if (completed !== initialCompleted) {
          changedTodos.push({
            id: todo.id,
            completed: completed ? 1 : 0,
            updated_on: new Date().getTime()
          });
        }
      }

      todos = await TodosService.updateTodos(changedTodos);

      self.$store.dispatch('setTodos', todos);
    }
  }
};
</script>

<style lang="scss" scoped></style>
