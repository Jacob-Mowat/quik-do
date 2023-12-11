import React, { useState, FormEvent } from 'react';
import Header from './components/header.component';
import { TodoType } from './types';

const App = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodoName, setNewTodoName] = useState<string>('');
    const [newTodoDate, setNewTodoDate] = useState<string>(new Date(Date.now()).toLocaleString().split(',')[0]);

    const submitNewTodo = (e: FormEvent) => {
        e.preventDefault();

        if (newTodoName.trim() === '') {
            alert('Please enter a name for your new todo.');
            return;
        }

        const newTodoItem: TodoType = {
            id: todos.length + 1,
            date: newTodoDate,
            title: newTodoName,
            completed: false,
        };

        setTodos([...todos, newTodoItem]);
        setNewTodoName('');
    };

    const toggleTodoCompletion = (todoId: number) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          )
        );
    };

    return (
        <div className=''>
            <Header />

            <section className="p-8">
                <form onSubmit={(e) => submitNewTodo(e)} className="flex md:flex-row flex-col items-center justify-between align-middle">
                    <div className="flex w-[20%] items-center px-4">
                        <input
                            type="date"
                            id="newTodoDate"
                            name="newTodoDate"
                            defaultValue={newTodoDate}
                            value={newTodoDate}
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
                    {todos.map((todo) => (
                        <div 
                            className={`flex w-full my-1 py-1 px-4 items-center justify-between text-[#0C0D0A] ${
                                todo.completed ? 'line-through text-[#BFB854]' : ''
                            }`}
                            key={todo.id}
                        >
                            <div className='md:w-[10%] text-xl'>
                                {todo.date}
                            </div>

                            <span className='w-[5%] text-4xl'> - </span>

                            <div className="md:w-[80%] sm:w-[40%] text-xl">
                                {todo.title}
                            </div>

                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodoCompletion(todo.id)}
                                className="md:w-[5%] sm:w-[2.5%] mr-0 transform scale-150 accent-[#BFB854] checked:border-[#BFAF9B] after:border-[#BFAF9B]"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
