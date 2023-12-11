import React, { createContext, useContext, useReducer } from 'react';
import { TodoType } from '../types';

export enum TodoDispatchActions {
    ADD_TODO = 'add-todo',
    TOGGLE_TODO = 'toggle-todo',
    DELETE_TODO = 'delete-todo',
};

const TodoReducer = (todos: TodoType[], action: any) => {
    switch (action.type) {
        case TodoDispatchActions.ADD_TODO:
            console.log(action.payload.todo);

            // Check if the todo title is empty
            if (action.payload.todo.title.trim() === '') {
                alert('Please enter a name for your new todo.');
                return todos;
            }

            // Check if the todo date is empty
            if (action.payload.todo.date.trim() === '') {
                alert('Please enter a date for your new todo.');
                return todos;
            }

            console.log(todos);

            // Create the new todo item
            const newTodoItem: TodoType = {
                id: todos.length + 1,
                date: action.payload.todo.date,
                title: action.payload.todo.title,
                completed: false,
            };

            console.log(newTodoItem);

            return [...todos, newTodoItem];
        case TodoDispatchActions.TOGGLE_TODO:
            return todos.map((todo) => {
                // If the todo id matches the id of the todo we want to toggle, toggle it
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed };
                }

                return todo;
            });
        case TodoDispatchActions.DELETE_TODO:
            // Return all todos except the todo we want to delete
            return todos.filter((todo) => todo.id !== action.payload.id);
        default:
            // If the action type is not recognised, return the todos array
            return todos;
    }
}

type Action = { type: TodoDispatchActions.ADD_TODO; payload: { todo: { title: string, date: string } } }
  | { type: TodoDispatchActions.TOGGLE_TODO; payload: { id: number } }
  | { type: TodoDispatchActions.DELETE_TODO; payload: { id: number } };

export const TodoContext = createContext<TodoType[]>([]);
export const TodoDispatchContext = createContext<React.Dispatch<Action>>(() => {});

export const useTodo = () => {
    return useContext(TodoContext);
}

export const useTodoDispatch = () => {
    return useContext(TodoDispatchContext);
}

export const TodoProvider = ({ children }: { children?: React.ReactNode }) => {
    // Use TodoReducer instead of useState
    const [todos, dispatch] = useReducer(TodoReducer, []);

    return (
        <TodoContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    );
};