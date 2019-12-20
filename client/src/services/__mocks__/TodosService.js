class TodosService {
  static addTodo(todo) {
    return new Promise(async (resolve, reject) => {
      resolve([
        {
          id: 1,
          name: 'First todo item',
          completed: 0,
          create_on: new Date()
        },
        {
          id: 2,
          name: 'Second todo item',
          completed: 0,
          create_on: new Date('2019-12-03')
        },
        {
          id: 3,
          name: 'Third todo item',
          completed: 0,
          create_on: new Date('2019-11-29')
        }
      ]);
    });
  }

  static deleteTodo(id) {
    return new Promise(async (resolve, reject) => {
      resolve([
        {
          id: 2,
          name: 'Second todo item',
          completed: 0,
          create_on: new Date('2019-12-03')
        },
        {
          id: 3,
          name: 'Third todo item',
          completed: 0,
          create_on: new Date('2019-11-29')
        }
      ]);
    });
  }

  static getTodos() {
    return new Promise(async (resolve, reject) => {
      resolve([]);
    });
  }

  static updateTodos(inTodos) {
    return new Promise(async (resolve, reject) => {
      resolve([]);
    });
  }
}

export default TodosService;
