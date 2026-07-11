<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

interface TodoItem {
  id?: string | number;
  completed?: boolean;
  text?: string;
  createdAt?: string;
  displayDate?: string;
  formattedDate?: string;
}

const props = defineProps<{ todo?: TodoItem }>();

function onToggle() {
  if (!props.todo) return;

  store.commit('TOGGLE_TODO', props.todo.id);
}

async function onDelete() {
  if (!props.todo?.id) return;

  await store.dispatch('deleteTodo', props.todo.id);
}
</script>

<template>
  <div
    :class="[
      'todo-item',
      props.todo?.completed ? 'todo-item--completed' : 'todo-item--active',
    ]"
  >
    <input
      :checked="props.todo?.completed"
      type="checkbox"
      class="todo-checkbox"
      @change="onToggle"
    />

    <span
      v-if="props.todo?.text"
      :class="[
        'todo-text',
        { 'todo-text--completed': props.todo?.completed },
      ]"
    >
      {{ props.todo.text }}
    </span>

    <small class="todo-date">
      {{ props.todo?.displayDate || props.todo?.formattedDate || '' }}
    </small>

    <button
      class="btn btn-xs btn-danger"
      @click="onDelete"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin: 6px 0;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: #fff;
  transition: all 0.2s ease;
}

.todo-item:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.todo-item--completed {
  border-color: #c3e6cb;
  background-color: #d4edda;
}

.todo-item--active {
  border-color: #dee2e6;
  background-color: #fff;
}

.todo-checkbox {
  margin-right: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
}

.todo-text--completed {
  text-decoration: line-through;
  opacity: 0.5;
}

.todo-date {
  margin: 0 10px;
  color: #aaa;
  font-size: 11px;
  white-space: nowrap;
}

.btn-danger {
  padding: 2px 8px;
}
</style>