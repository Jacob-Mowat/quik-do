import moment from 'moment';
import Header from './components/header.component';
import { useState, FormEvent } from 'react';
import BinIcon from './components/BinIcon.component';
import { TodoDispatchActions, useTodo, useTodoDispatch } from './contexts/Todo.context';
import { TodoType } from './types';
import { useAuth0 } from '@auth0/auth0-react';
import { TodoDateFilters, useTodoFilter } from './contexts/TodoFilter.context';

const filters = ['All', 'Completed', 'Active'];

const App = () => {
    // Use our useTodo hook to get the todos array and the action
    const todos = useTodo();
    const dispatch = useTodoDispatch();

    // Use the filter hook to get the selected filter
    const dateFilter = useTodoFilter();

    const [newTodoName, setNewTodoName] = useState<string>('');
    const [newTodoDate, setNewTodoDate] = useState<string>(moment().format("YYYY-MM-DD"));

    const { isAuthenticated, isLoading } = useAuth0();

    const [selectedFilter, setSelectedFilter] = useState<string>('All');

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

    const filterTodos = (todos: TodoType[], filter: string) => {
        let todosToReturn: TodoType[] = todos;

        // First, filter by date
        switch (dateFilter) {
            case TodoDateFilters.TODAY:
                todosToReturn = todos.filter((todo) => moment(todo.date).isSame(moment(), 'day'));
                break;
            case TodoDateFilters.LAST_7_DAYS:
                todosToReturn = todos.filter((todo) => moment(todo.date).isSameOrAfter(moment().subtract(7, 'days')));
                break;
            case TodoDateFilters.LAST_30_DAYS:
                todosToReturn = todos.filter((todo) => moment(todo.date).isSameOrAfter(moment().subtract(30, 'days')));
                break;
            default: // TodoDateFilters.ALL
                break;
        }

        // Then, filter by All/Completed/Active
        switch (filter) {
            case 'All':
                break;
            case 'Completed':
                todosToReturn = todosToReturn.filter((todo) => todo.completed);
                break;
            case 'Active':
                todosToReturn = todosToReturn.filter((todo) => !todo.completed);
                break;
            default:
                break;
        }

        return todosToReturn;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-hidden">
            <Header />

            {/* If the user is not authenticated, show a message */}
            {!isAuthenticated && (
                <div className="flex items-center justify-center h-screen -mt-[96px]">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold text-[#0C0D0A]">Welcome to QuikDo!</h1>
                        <p className="text-xl text-[#0C0D0A]">Please login to use the app.</p>
                    </div>
                </div>
            )}

            {/* If the user is authenticated, show the todos */}
            {isAuthenticated && (
            <section className="p-8 items-center">
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
                            autoComplete="off"
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

                {/* Add a row with links to select either All/Completed/Active */}
                <div className="flex w-full items-center justify-center text-[#0C0D0A] my-4">
                    {todos.length > 0 && filters.map((filterOption) => (
                        <div className="flex items-center mx-4" key={filterOption}>
                            <button
                                onClick={(e: any) => { e.preventDefault(); setSelectedFilter(filterOption); }}
                                className={`text-[${selectedFilter===filterOption?"#BFB854":"#0C0D0A"}] text-xl`}
                            >
                                {filterOption}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col list-disc my-4">
                    {filterTodos(todos.sort((todo_a: TodoType, todo_b: TodoType) => moment(todo_b.date).valueOf() - moment(todo_a.date).valueOf()), selectedFilter).map((todo: TodoType) => (
                        <div
                            className={`flex w-full my-1 py-1 px-4 items-center justify-between text-[#0C0D0A] ${
                                todo.completed ? 'line-through text-[#BFB854]' : ''
                            }`}
                            key={todo.id}
                        >
                            {/* <span className='w-[5%] text-4xl text-center align-middle'> - </span> */}
                            <div className='md:w-[10%] text-xl'>
                            {moment(todo.date).format('DD/MM/YYYY').replaceAll('/', ' / ')}
                            </div>


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
            </section>)}
        </div>
    );
}

export default App;
