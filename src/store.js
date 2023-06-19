import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// persist  - позволяет кэшировать значение, т.е. после перезагрузки страницы добавленные данные не обнуляться

const initialState = {
  todos: [
    { id: 1, title: 'Learn JS', completed: true },
    { id: 2, title: 'Learn React', completed: false },
  ],
  loading: false,
  error: null,
};

export const useTodos = create(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // способ 1: берем текущие значения в state и добавляем к ним новое
        // state - полностью весь объект, т.е. включает в себя todos, loading и т.д.
        // addTodo: (title) => set(state => {
        //   const newTodo = { id: nanoid(), title, completed: false }

        //   return { todos: [...state.todos, newTodo] }
        // })

        // способ 2 - аналогичено, но короче
        // addTodo: (title) => set(state => ({ todos: [...state.todos, { id: nanoid(), title, completed: false }] }))

        // способ 3 - используем метод get() - возвращает state
        addTodo: (title) => {
          const newTodo = { id: nanoid(), title, completed: false };
          set({ todos: [...get().todos, newTodo] });
        },
        toggleTodo: (todoId) =>
          set({
            todos: get().todos.map((todo) =>
              todoId === todo.id
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }),
        fetchTodos: async () => {
          set({ loading: true });

          try {
            const res = await fetch(
              'https://jsonplaceholder.typicode.com/todos?_limit=10'
            );

            if (!res.ok) throw new Error('Failed to fetch! Try again.');

            set({ todos: await res.json(), error: null });
          } catch (error) {
            set({ error: error.message });
          } finally {
            set({ loading: false });
          }
        },
        // сбрасываем state в начальное состояние
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'favoritesStorage',
        // storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useFilter = create((set) => ({
  filter: 'all',
  setFilter: (value) => set({ filter: value }),
}));
