import React from 'react';
import { BarChart3, Users, Activity, TrendingUp, Clock, Settings } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the IOG management dashboard. View and analyze organization data.
        </p>
      </header>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Total Employees', value: '512', icon: <Users />, change: '+12% from last month' },
          { title: 'Departments', value: '24', icon: <BarChart3 />, change: 'Added 2 this quarter' },
          { title: 'Activity Rate', value: '97%', icon: <Activity />, change: 'Increased by 5%' }
        ].map((stat, i) => (
          <div key={i} className="modern-card p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-xs text-accent">{stat.change}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 modern-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Department Activity</h3>
            <div className="flex items-center gap-2">
              <button className="btn-secondary px-3 py-1 text-sm rounded-md">Month</button>
              <button className="btn-secondary px-3 py-1 text-sm rounded-md">Quarter</button>
              <button className="btn-primary px-3 py-1 text-sm rounded-md">Year</button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center border-t border-border pt-4">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Interactive chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        <div className="modern-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
          <div className="space-y-4">
            {[
              { icon: <Users className="text-blue-500" />, title: 'New team members', desc: '3 employees added to Engineering', time: '2h ago' },
              { icon: <TrendingUp className="text-green-500" />, title: 'Performance review', desc: 'Q2 reviews completed', time: '1d ago' },
              { icon: <Settings className="text-orange-500" />, title: 'System update', desc: 'Platform maintenance completed', time: '2d ago' },
              { icon: <Clock className="text-purple-500" />, title: 'Time tracking', desc: 'New tracking system implemented', time: '3d ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 btn-secondary py-2 rounded-md text-sm font-medium">View All Activity</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
