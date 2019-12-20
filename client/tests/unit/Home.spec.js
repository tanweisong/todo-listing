import { createLocalVue, mount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Home from '@/views/Home.vue';
import { doesNotReject } from 'assert';

jest.mock('@/services/TodosService');

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Home.vue', () => {
  it('renders no items in list', async () => {
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $store: {
          dispatch: jest.fn(),
          actions: {
            setTodos: jest.fn()
          },
          getters: {
            getTodos: []
          },
          mutations: {
            setTodos: jest.fn()
          }
        }
      }
    });
    expect(wrapper.find('.main-container-noitem').isVisible()).toBe(true);
  });

  it('add items and item exists in list', async () => {
    const mockStore = {
      dispatch: jest.fn(),
      actions: {
        setTodos: jest.fn()
      },
      getters: {
        getTodos: []
      },
      mutations: {
        setTodos: jest.fn()
      }
    };
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $store: mockStore
      }
    });

    wrapper.find('#todo-name').setValue('First todo item');
    await wrapper.vm.$nextTick();

    wrapper.find('#add-button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('check the first item in todo list', async () => {
    const toggleChecked = jest.fn();
    const updateTodos = jest.fn();
    const mockStore = {
      dispatch: jest.fn(),
      actions: {
        setTodos: jest.fn()
      },
      getters: {
        getTodos: [
          {
            id: 1,
            name: 'Item 1',
            completed: false,
            created_on: new Date().getTime()
          }
        ]
      },
      mutations: {
        setTodos: jest.fn()
      }
    };
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $store: mockStore
      },
      methods: {
        toggleChecked,
        updateTodos
      }
    });

    const checkbox = wrapper.findAll('input[type="checkbox"]').at(0);

    checkbox.setChecked();

    expect(toggleChecked).toBeCalled();

    setTimeout(function() {
      expect(updateTodos).toBeCalled();

      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    }, 500);
  });

  it('delete one item and length should be lesser by 1', async () => {
    const deleteTodo = jest.fn();
    const mockStore = {
      dispatch: jest.fn(),
      actions: {
        setTodos: jest.fn()
      },
      getters: {
        getTodos: [
          {
            id: 1,
            name: 'Item 1',
            completed: false,
            created_on: new Date().getTime()
          }
        ]
      },
      mutations: {
        setTodos: jest.fn()
      }
    };
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $store: mockStore
      },
      methods: {
        deleteTodo
      }
    });

    wrapper
      .findAll('.main-container-todo')
      .at(0)
      .find('.todoDelete')
      .trigger('click');

    expect(deleteTodo).toBeCalled();

    setTimeout(function() {
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
