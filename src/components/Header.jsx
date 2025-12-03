/* eslint-disable react-hooks/static-components */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive 
            ? 'bg-blue-50 text-blue-700' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">IVY</div>
            <span>Monitor</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/">Overview</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;