import React, { useState } from 'react';
import { Bot, Brain, Zap, Code, X, Database, ChevronLeft, Filter, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

const Reports = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');

  // Sample agent messages
  const messages = [
    {
      id: 1,
      agent: 'Data Analysis Agent',
      subject: 'Weekly Employee Productivity Report',
      preview: "I've analyzed the productivity metrics for all departments. The Midnight team shows a 12% increase in...",
      date: '2025-07-08',
      time: '14:32',
      priority: 'high',
      unread: true,
      icon: <Database className="h-5 w-5" />,
      color: 'text-blue-500',
      fullMessage: `
        <h2>Weekly Employee Productivity Report</h2>
        <p>I've completed my analysis of productivity metrics across all departments for the past week.</p>
        <h3>Key Findings:</h3>
        <ul>
          <li>The Midnight team shows a 12% increase in output compared to last month</li>
          <li>Engineering team velocity has improved by 8.3% after implementing the new sprint planning process</li>
          <li>There are 3 teams showing signs of potential burnout based on overtime patterns</li>
        </ul>
        <p>Attached are the detailed metrics. Would you like me to schedule follow-up meetings with the team leads?</p>
      `
    },
    {
      id: 2,
      agent: 'Code Review Agent',
      subject: 'Security Vulnerabilities Detected',
      preview: "During my routine code scan, I found 3 potential security vulnerabilities in the BlockchainVisualization component...",
      date: '2025-07-08',
      time: '11:15',
      priority: 'urgent',
      unread: true,
      icon: <Code className="h-5 w-5" />,
      color: 'text-red-500',
      fullMessage: `
        <h2>Security Vulnerabilities Detected</h2>
        <p>During my routine code scan, I found 3 potential security vulnerabilities in the BlockchainVisualization component.</p>
        <h3>Issues Found:</h3>
        <ol>
          <li><strong>Unvalidated User Input</strong>: The search function doesn't properly sanitize user input</li>
          <li><strong>Outdated D3.js Library</strong>: Current version has known CVEs</li>
          <li><strong>Exposed API Keys</strong>: Found hardcoded API keys in the component</li>
        </ol>
        <p>I've created tickets for each issue in the project management system. Would you like me to create a PR with the fixes?</p>
      `
    },
    {
      id: 3,
      agent: 'Research Assistant',
      subject: 'New Visualization Techniques Research',
      preview: "Based on your request, I've compiled research on alternative visualization techniques for large organizational structures...",
      date: '2025-07-07',
      time: '16:45',
      priority: 'normal',
      unread: false,
      icon: <Brain className="h-5 w-5" />,
      color: 'text-purple-500',
      fullMessage: `
        <h2>New Visualization Techniques Research</h2>
        <p>Based on your request, I've compiled research on alternative visualization techniques for large organizational structures.</p>
        <h3>Promising Approaches:</h3>
        <ul>
          <li><strong>Force-directed Network Graphs</strong>: Better for showing relationships between team members</li>
          <li><strong>Sunburst Diagrams</strong>: More space-efficient than circle packing for deep hierarchies</li>
          <li><strong>Treemaps</strong>: Excellent for visualizing department size and resource allocation</li>
        </ul>
        <p>I've attached sample implementations of each technique using our current dataset. The sunburst diagram seems particularly promising for the Midnight department's complex structure.</p>
      `
    },
    {
      id: 4,
      agent: 'Process Automation Agent',
      subject: 'Onboarding Process Optimization Results',
      preview: "I've completed the onboarding process optimization. The new workflow reduces HR processing time by 47% and...",
      date: '2025-07-06',
      time: '09:23',
      priority: 'normal',
      unread: false,
      icon: <Zap className="h-5 w-5" />,
      color: 'text-amber-500',
      fullMessage: `
        <h2>Onboarding Process Optimization Results</h2>
        <p>I've completed the onboarding process optimization project you requested last month.</p>
        <h3>Improvements Achieved:</h3>
        <ul>
          <li>Reduced HR processing time by 47%</li>
          <li>Eliminated 12 redundant approval steps</li>
          <li>Automated document collection and verification</li>
          <li>Created personalized welcome sequences for each department</li>
        </ul>
        <p>The new process has been implemented in the HR system. Would you like me to schedule a training session for the HR team on the new workflow?</p>
      `
    },
    {
      id: 5,
      agent: 'Data Analysis Agent',
      subject: 'Midnight Department Performance Review',
      preview: "Here's the quarterly performance review for the Midnight department. Key metrics show improvement in...",
      date: '2025-07-05',
      time: '14:15',
      priority: 'high',
      unread: false,
      icon: <Database className="h-5 w-5" />,
      color: 'text-blue-500',
      fullMessage: `
        <h2>Midnight Department Performance Review</h2>
        <p>I've analyzed the quarterly performance data for the Midnight department as requested.</p>
        <h3>Key Findings:</h3>
        <ul>
          <li>Overall productivity increased by 15% compared to last quarter</li>
          <li>Project completion rate improved from 78% to 91%</li>
          <li>The Architecture team is significantly outperforming targets</li>
          <li>The Cryptography team needs additional resources based on current workload</li>
        </ul>
        <p>I've prepared detailed reports for each subdepartment. Would you like me to share these with the respective team leads?</p>
      `
    }
  ];

  // Filter messages based on priority
  const filteredMessages = filterPriority === 'all' 
    ? messages 
    : messages.filter(message => message.priority === filterPriority);

  // Priority badge styling
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge variant="default">High</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Agent Inbox</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Messages and notifications from your AI agents
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search messages..." 
              className="pl-8 w-[250px]"
            />
          </div>
          <select 
            className="px-3 py-2 border rounded-md bg-background" 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {filteredMessages.length} messages
        </div>
      </div>
      
      <div className="border rounded-lg shadow-sm bg-card text-card-foreground mb-6">
        <div className="divide-y">
          {filteredMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start p-4 hover:bg-muted/50 cursor-pointer ${message.unread ? 'bg-muted/30' : ''}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className={`rounded-full p-2 mr-4 bg-muted ${message.color}`}>
                {message.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium truncate">{message.agent}</h4>
                  <div className="flex items-center space-x-2">
                    {message.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                    )}
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {message.date}, {message.time}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-base mb-1 ${message.unread ? 'font-medium' : ''}`}>
                  {message.subject}
                </h3>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate">
                    {message.preview}
                  </p>
                  <div className="ml-4 flex items-center space-x-2">
                    {getPriorityBadge(message.priority)}
                    <button 
                      className="px-4 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(message);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message detail dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-3xl h-[600px] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <div className={`rounded-full p-2 ${selectedMessage?.color}`}>
                    {selectedMessage?.icon}
                  </div>
                </Avatar>
                <div>
                  <DialogTitle>{selectedMessage?.agent}</DialogTitle>
                  <DialogDescription className="text-sm">
                    {selectedMessage?.date}, {selectedMessage?.time}
                  </DialogDescription>
                </div>
              </div>
              {selectedMessage && getPriorityBadge(selectedMessage.priority)}
            </div>
          </DialogHeader>
          
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">{selectedMessage?.subject}</h2>
            <div 
              className="prose dark:prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: selectedMessage?.fullMessage }}
            />
            
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 rounded-md border hover:bg-muted">
                Dismiss
              </button>
              <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                Take Action
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
