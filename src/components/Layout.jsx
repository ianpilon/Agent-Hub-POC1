import React from 'react';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "flex h-screen w-full",
      "bg-background text-foreground",
      "transition-colors duration-300 ease-in-out"
    )}>
      <Navigation />
      <div className="flex-1 overflow-auto">
        <main className="h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
