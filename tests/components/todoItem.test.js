import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TodoItem from '../../components/TodoItem.vue';

const store = vi.hoisted(() => ({
  commit: vi.fn(),
}));

vi.mock('vuex', () => ({
  useStore: () => store,
}));

const todo = {
  id: 'todo_1',
  text: 'buy bread',
  completed: false,
  displayDate: '11/07/2026',
};

function mountTodoItem(options = {}) {
  return mount(TodoItem, {
    ...options,
    global: {
      provide: {
        theme: {},
      },
      ...options.global,
    },
  });
}

describe('TodoItem', () => {
  beforeEach(() => {
    store.commit.mockClear();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          status: 200,
        }),
      ),
    );
  });

  it('displays the todo text and date', () => {
    const wrapper = mountTodoItem({
      props: {
        todo,
      },
    });

    expect(wrapper.text()).toContain('buy bread');
    expect(wrapper.text()).toContain('11/07/2026');
  });

  it('commits the toggle mutation when the checkbox changes', async () => {
    const wrapper = mountTodoItem({
      props: {
        todo,
      },
    });

    await wrapper.find('input[type="checkbox"]').trigger('change');

    expect(store.commit).toHaveBeenCalledWith('TOGGLE_TODO', 'todo_1');
  });

  it('calls the API then removes the todo from the store', async () => {
    const wrapper = mountTodoItem({
      props: {
        todo,
      },
    });

    await wrapper.find('button').trigger('click');
    await vi.waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos/todo_1', {
        method: 'DELETE',
      });
      expect(store.commit).toHaveBeenCalledWith('DELETE_TODO', 'todo_1');
    });
  });

  it('does nothing when no todo is provided', async () => {
    const wrapper = mountTodoItem();

    await wrapper.find('input[type="checkbox"]').trigger('change');
    await wrapper.find('button').trigger('click');

    expect(store.commit).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
});
