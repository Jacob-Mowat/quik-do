import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { TodoDateFilters, TodoFilterDispatchActions, useTodoFilter, useTodoFilterDispatch } from "../contexts/TodoFilter.context";

const Header = () => {
    const { isAuthenticated, logout, loginWithRedirect, isLoading, user } = useAuth0();
    const dispatch = useTodoFilterDispatch();
    const selectedFilter = useTodoFilter();
    
    const dates = [
        TodoDateFilters.ALL,
        TodoDateFilters.TODAY,
        TodoDateFilters.LAST_7_DAYS,
        TodoDateFilters.LAST_30_DAYS,
    ];

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user);
        }
    }, [isAuthenticated]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <header className='h-20 flex items-center justify-between px-8 bg-[#0C0D0A]'>
            <div className='flex items-center'>
                <span className="text-2xl font-bold text-[#D9D3C7]">QuikDo</span>
            </div>

            {/* Menu actions */}
            <nav className="flex items-center space-x-4">
                {/* Filter todos */}
                {isAuthenticated && dates.map((filterOption) => (
                    <a key={filterOption} href="#" onClick={(e) => dispatch({ type: TodoFilterDispatchActions.SET_FILTER, payload: { filter: filterOption}})} className={`hover:text-[#BFB854] ${selectedFilter === filterOption ? "text-xl text-[#BFB854]" : "text-[#D9D3C7]"}`}>{filterOption}</a>
                ))}
            </nav>

            <nav className="flex items-center space-x-4">
                {isAuthenticated && (
                <a href="#" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="hover:text-[#BFB854] text-[#D9D3C7]">Logout</a>
                )}
                {!isAuthenticated && (
                <a href="#" onClick={() => loginWithRedirect() }className="hover:text-[#BFB854] text-[#D9D3C7]">Login</a>
                )}
            </nav>
        </header>
    );
}

export default Header;