import React from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '@/nav-items';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Navigation = () => {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = React.useState(false);
  
  return (
    <div className={cn(
      "h-screen flex-shrink-0 border-r flex flex-col transition-all duration-300 ease-in-out nav-sidebar",
      collapsed ? 'w-20' : 'w-64'
    )}>
      {/* Logo and header area */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-lg">IO</div>
          {!collapsed && <span className="ml-3 font-semibold">IOG</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 rounded-md hover:bg-secondary flex items-center justify-center"
        >
          {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Navigation items */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center p-3 rounded-lg transition-all",
                  "nav-link",
                  isActive && "active",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <span className="flex items-center justify-center w-6 h-6">
                  {item.icon}
                </span>
                {!collapsed && <span className="ml-3 font-medium">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Theme toggle at bottom */}
      <div className="p-3 border-t border-border flex items-center justify-center">
        <button 
          className="h-9 w-9 rounded-lg hover:bg-secondary flex items-center justify-center"
          onClick={() => document.documentElement.classList.toggle('dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
