import { createLocalVue, mount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import About from '@/views/About.vue';

jest.mock('@/services/TodosService');

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('About.vue', () => {
  it('all the rows in summary table should be 0', async () => {
    const wrapper = mount(About, {
      localVue,
      mocks: {
        $store: {
          getters: {
            getTodos: []
          }
        }
      }
    });

    await wrapper.vm.$nextTick();

    let summary = wrapper.find('#todo-summary');
    let created = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(0);
    let completed = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(1);
    let curreNotCompleted = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(2);
    let currCompleted = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(3);

    expect(
      created
        .findAll('td')
        .at(1)
        .text()
    ).toBe('0');
    expect(
      completed
        .findAll('td')
        .at(1)
        .text()
    ).toBe('0');
    expect(
      curreNotCompleted
        .findAll('td')
        .at(1)
        .text()
    ).toBe('0');
    expect(
      currCompleted
        .findAll('td')
        .at(1)
        .text()
    ).toBe('0');
  });

  it('summary table reflects information correctly', async () => {
    const wrapper = mount(About, {
      localVue,
      mocks: {
        $store: {
          getters: {
            getTodos: [
              {
                id: 1,
                name: 'Item 1',
                completed: true,
                created_on: new Date('2019-11-13').getTime(),
                updated_on: new Date().getTime()
              },
              {
                id: 2,
                name: 'Item 2',
                completed: false,
                created_on: new Date('2019-11-29').getTime()
              },
              {
                id: 3,
                name: 'Item 3',
                completed: true,
                created_on: new Date('2019-12-01').getTime(),
                updated_on: new Date().getTime()
              },
              {
                id: 4,
                name: 'Item 4',
                completed: false,
                created_on: new Date('2019-12-05').getTime()
              }
            ]
          }
        }
      }
    });

    await wrapper.vm.$nextTick();

    let summary = wrapper.find('#todo-summary');
    let created = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(0);
    let completed = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(1);
    let curreNotCompleted = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(2);
    let currCompleted = summary
      .find('tbody')
      .findAll('.el-table__row')
      .at(3);

    expect(
      created
        .findAll('td')
        .at(1)
        .text()
    ).toBe('4');
    expect(
      completed
        .findAll('td')
        .at(1)
        .text()
    ).toBe('2');
    expect(
      curreNotCompleted
        .findAll('td')
        .at(1)
        .text()
    ).toBe('0');
    expect(
      currCompleted
        .findAll('td')
        .at(1)
        .text()
    ).toBe('2');
  });
});
