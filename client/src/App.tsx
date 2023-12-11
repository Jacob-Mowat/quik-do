import React, { useState, FormEvent } from 'react';
import moment from 'moment';
import Header from './components/header.component';
import BinIcon from './components/BinIcon.component';
import { TodoType } from './types';

const App = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodoName, setNewTodoName] = useState<string>('');
    const [newTodoDate, setNewTodoDate] = useState<string>(moment().format("YYYY-MM-DD"));

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

    const deleteTodo = (todoId: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    }

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
                    {todos.sort((todo_a, todo_b) => moment(todo_b.date).valueOf() - moment(todo_a.date).valueOf()).map((todo) => (
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
