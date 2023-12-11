import React, { useState, FormEvent } from 'react';
import Header from './components/header.component';
import { TodoType } from './types';

const App = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodoName, setNewTodoName] = useState<string>('');

    const submitNewTodo = (e: FormEvent) => {
        e.preventDefault();

        if (newTodoName.trim() === '') {
            alert('Please enter a name for your new todo.');
            return;
        }

        const newTodoItem: TodoType = {
            id: todos.length + 1,
            title: newTodoName,
            completed: false,
        };

        setTodos([...todos, newTodoItem]);
        setNewTodoName('');
    };

    return (
        <div className=''>
            <Header />

            <section className="p-8">
                <form onSubmit={(e) => submitNewTodo(e)} className="flex items-center justify-between align-middle">
                    <div className="flex w-full items-center px-4">
                        <label htmlFor="newTodoName" className="flex text-[#D9D3C7] px-4 align-middle">
                            Name:
                        </label>
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
                        className="flex bg-[#BFB854] text-[#0C0D0A] mx-2 px-4 py-2 rounded-md hover:bg-[#BFAF9B]"
                    >
                        Add Todo
                    </button>
                </form>

                <ul className="list-disc pl-8">
                    {todos.map((todo) => (
                        <li key={todo.id} className="text-#D9D3C7">
                            {todo.title}
                        </li>
                    ))}
                </ul>   
            </section>
        </div>
    );
}

export default App;
