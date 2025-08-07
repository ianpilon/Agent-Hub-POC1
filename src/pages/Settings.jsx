import React from 'react';
import { useTheme } from '../components/ThemeProvider';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Configure application settings and preferences.
      </p>
      
      <div className="border rounded-lg p-6 shadow-sm bg-card text-card-foreground mb-6">
        <h3 className="text-xl font-medium mb-4">Appearance</h3>
        
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Theme</label>
            <div className="flex space-x-4">
              <button 
                className={`px-4 py-2 rounded-md ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${theme === 'system' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setTheme('system')}
              >
                System
              </button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Navigation Display</label>
            <select className="px-4 py-2 rounded-md border bg-background">
              <option>Expanded</option>
              <option>Collapsed</option>
              <option>Auto (Collapse on small screens)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-6 shadow-sm bg-card text-card-foreground">
        <h3 className="text-xl font-medium mb-4">About</h3>
        <p className="text-muted-foreground">
          IOG Employees Application - Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Settings;
