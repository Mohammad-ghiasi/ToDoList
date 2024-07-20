import { create } from "zustand";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  data: string;
};

export type UserStore = {
  isLoggedIn: boolean;
  todoLength: number;
  todos: Todo[];
  actions: {
    loginUser: () => void;
    logoutUser: () => void;
    increaseTodoLength: () => void;
    decreaseTodoLength: () => void;
    setTodoLength: (length: number) => void;
    setTodos: (data: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (updatedTodo: Todo) => void;
    deleteTodo: (id: number) => void;
    editestatuse: (id: number, status: boolean) => void; // Added this action
  };
};

export const userStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  todoLength: 0,
  todos: [],
  actions: {
    loginUser: () => set(() => ({ isLoggedIn: true })),
    logoutUser: () => set(() => ({ isLoggedIn: false })),
    increaseTodoLength: () =>
      set((state) => ({ todoLength: state.todoLength + 1 })),
    decreaseTodoLength: () =>
      set((state) => ({
        todoLength: state.todoLength > 0 ? state.todoLength - 1 : 0,
      })),
    setTodoLength: (length: number) => set(() => ({ todoLength: length })),

    setTodos: (data: Todo[]) => {
      if (Array.isArray(data)) {
        set(() => ({ todos: data }));
      } else {
        console.error("setTodos called with non-array data:", data);
      }
    },

    addTodo: (todo: Todo) =>
      set((state) => ({ todos: [...state.todos, todo] })),

    updateTodo: (updatedTodo: Todo) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        ),
      })),

    deleteTodo: (id: number) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),

    // Define the editestatuse action
    editestatuse: (id: number, status: boolean) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: status } : todo
        ),
      })),
  },
}));
