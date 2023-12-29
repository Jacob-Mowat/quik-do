import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const filterOptions = [
    'All',
    'Today',
    'This Week',
    'This Month',
];

const Header = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const { isAuthenticated, logout, loginWithRedirect, isLoading } = useAuth0();

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
                {isAuthenticated && filterOptions.map((filterOption) => (
                    <a key={filterOption} href="#" onClick={(e) => setSelectedFilter(filterOption)}className={`hover:text-[#BFB854] ${selectedFilter === filterOption ? "text-xl text-[#BFB854]" : "text-[#D9D3C7]"}`}>{filterOption}</a>
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