import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import router from '@/router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

jest.mock('@/services/TodosService');

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(ElementUI);

describe('App.vue', () => {
  it('renders home view after clicking on home link', async () => {
    const wrapper = mount(App, {
      localVue,
      router,
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
    wrapper.find('#home-link').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find(Home).exists()).toBe(true);
    expect(wrapper.find(About).exists()).toBe(false);
  });

  it('renders about view after clicking on about link', async () => {
    const wrapper = mount(App, {
      localVue,
      router,
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
    wrapper.find('#about-link').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find(Home).exists()).toBe(false);
    expect(wrapper.find(About).exists()).toBe(true);
  });
});
