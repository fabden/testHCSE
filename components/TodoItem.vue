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

  console.log(
    'onToggle appelé pour todo id:',
    props.todo.id,
    'état:',
    props.todo.completed,
  );

  store.commit('TOGGLE_TODO', props.todo.id);
}

async function onDelete() {
  if (!props.todo?.id) return;

  await store.dispatch('deleteTodo', props.todo.id);
}
</script>

<template>
  <div
    class="todo-item"
    :style="{
      border: props.todo?.completed
        ? '1px solid #c3e6cb'
        : '1px solid #dee2e6',
      backgroundColor: props.todo?.completed ? '#d4edda' : '#ffffff',
    }"
  >
    <input
      :checked="props.todo?.completed"
      type="checkbox"
      class="todo-checkbox"
      @change="onToggle"
    />

    <span
      v-if="props.todo?.text"
      class="todo-text"
      :style="{
        textDecoration: props.todo?.completed ? 'line-through' : 'none',
        opacity: props.todo?.completed ? 0.5 : 1,
      }"
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
  border-radius: 6px;
  transition: all 0.2s ease;
}

.todo-item:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
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

.todo-date {
  color: #aaa;
  margin: 0 10px;
  font-size: 11px;
  white-space: nowrap;
}

.btn-danger {
  padding: 2px 8px;
}
</style>