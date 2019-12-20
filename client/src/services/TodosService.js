import axios from 'axios';

const url = '../api/todo';

class TodosService {
  static addTodo(todo) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url, todo);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static deleteTodo(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}/${id}`);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getTodos() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static updateTodos(inTodos) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(url, inTodos);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default TodosService;
