import React, { useState, FormEvent, useReducer, useContext } from 'react';
import moment from 'moment';
import Header from './components/header.component';
import BinIcon from './components/BinIcon.component';
import { TodoContext, TodoDispatchActions, TodoDispatchContext, TodoProvider, useTodo, useTodoDispatch } from './contexts/Todo.context';
import { TodoType } from './types';

const App = () => {
    // Use our useTodo hook to get the todos array and the action
    const todos = useTodo();
    const dispatch = useTodoDispatch();

    const [newTodoName, setNewTodoName] = useState<string>('');
    const [newTodoDate, setNewTodoDate] = useState<string>(moment().format("YYYY-MM-DD"));

    const submitNewTodo = () => {
        // Add the new todo to the todos array, call dispatch on our reducer
        dispatch({ type: TodoDispatchActions.ADD_TODO, payload: { todo: { title: newTodoName, date: newTodoDate } } });

        // Reset our fields
        setNewTodoName('');
        setNewTodoDate(moment().format("YYYY-MM-DD"));
    };

    const toggleTodoCompletion = (todoId: number) => {
        // Toggle the todo completion
        dispatch({ type: TodoDispatchActions.TOGGLE_TODO, payload: { id: todoId } });
    };

    const deleteTodo = (todoId: number) => {
        // Confirm the user wants to delete the todo
        if (!window.confirm('Are you sure you want to delete this todo?')) {
            return;
        }

        // Delete the todo
        dispatch({ type: TodoDispatchActions.DELETE_TODO, payload: { id: todoId } });
    };

    return (
        <div className="overflow-x-hidden">
            <Header />

            <section className="p-8">
                <form 
                    onSubmit={(e: FormEvent) => { 
                        e.preventDefault(); 
                        submitNewTodo();
                    }} 
                    className="flex md:flex-row flex-col items-center justify-between align-middle"
                >
                    <div className="flex w-[20%] items-center px-4">
                        <input
                            type="date"
                            id="newTodoDate"
                            name="newTodoDate"
                            defaultValue={newTodoDate}
                            onChange={(e) => setNewTodoDate(e.target.value)}
                            className="flex w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#BFB854]"
                            placeholder="Enter the name of your new todo..."
                        />
                    </div>
                    
                    <div className="flex w-full items-center px-4">
                        <input
                            type="text"
                            id="newTodoName"
                            name="newTodoName"
                            value={newTodoName}
                            onChange={(e) => setNewTodoName(e.target.value)}
                            className="flex w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#BFB854]"
                            placeholder="Enter the name of your new todo..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex bg-[#BFB854] text-[#0C0D0A] mx-2 px-4 rounded-md hover:bg-[#BFAF9B]"
                    >
                        Add Todo
                    </button>
                </form>

                <div className="flex flex-col list-disc mt-8">
                    {todos.sort((todo_a: TodoType, todo_b: TodoType) => moment(todo_b.date).valueOf() - moment(todo_a.date).valueOf()).map((todo: TodoType) => (
                        <div 
                            className={`flex w-full my-1 py-1 px-4 items-center justify-between text-[#0C0D0A] ${
                                todo.completed ? 'line-through text-[#BFB854]' : ''
                            }`}
                            key={todo.id}
                        >
                            <div className='md:w-[10%] text-xl'>
                                {moment(todo.date).format('DD/MM/YYYY').replaceAll('/', ' / ')}
                            </div>

                            {/* <span className='w-[5%] text-4xl text-center align-middle'> - </span> */}

                            <div className="md:w-[80%] sm:w-[40%] text-xl pl-8">
                                {todo.title}
                            </div>

                            <div className="flex justify-between md:w-[5%] sm:w-[2.5%] mr-0">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodoCompletion(todo.id)}
                                    className=" transform scale-150 accent-[#BFB854] checked:border-[#BFAF9B] after:border-[#BFAF9B]"
                                />

                                <BinIcon onClick={() => deleteTodo(todo.id)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
