import { useState } from "react";

type Todo = {
    id: string;
    title: string;
    description: string;
    status: boolean;
};

const Header = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    return (
        <header className='h-20 flex items-center justify-between px-8 bg-[#0C0D0A]'>
            <div className='flex items-center'>
                <span className="text-2xl font-bold text-[#D9D3C7]">QuikDo</span>
            </div>

            {/* Menu actions */}
            <nav className="flex items-center space-x-4">
                <a href="#" className="hover:text-[#BFB854] text-[#D9D3C7]">Today</a>
                <a href="#" className="hover:text-[#BFB854] text-[#D9D3C7]">This Week</a>
                <a href="#" className="hover:text-[#BFB854] text-[#D9D3C7]">This Month</a>
            </nav>

            <nav className="flex items-center space-x-4">
                <a href="#" className="hover:text-[#BFB854] text-[#D9D3C7]">Login</a>
                <a href="#" className="hover:text-[#BFB854] text-[#D9D3C7]">Register</a>
            </nav>
        </header>
    );
}

export default Header;