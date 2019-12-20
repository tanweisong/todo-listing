import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/utils/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    setTodos(state, payload) {
      state['todos'] = payload;
    }
  },
  getters: {
    getTodos(state) {
      return state['todos'];
    }
  },
  actions: {
    setTodos(context, todos) {
      if (!app.isNil(todos) && Array.isArray(todos)) {
        for (let index = 0; index < todos.length; index++) {
          var todo = todos[index];
          if (todo.hasOwnProperty('completed')) {
            todo['completed'] = todo.completed ? true : false;
            todo['initialCompleted'] = todo.completed ? true : false;
          }
        }
      }

      context.commit('setTodos', todos);
    }
  },
  modules: {}
});
