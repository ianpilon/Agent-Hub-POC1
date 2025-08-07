import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, BrainCircuit, Code, Search, Database, Sparkles, MessageCircle } from 'lucide-react';

const AIAgents = () => {
  // Sample AI agents data
  const agents = [
    {
      name: "Data Analysis Agent",
      description: "Processes organizational data to identify patterns and insights",
      icon: <Zap className="h-8 w-8 text-primary" />,
      status: "Active",
      taskCount: 24
    },
    {
      name: "Document Processing Agent",
      description: "Automatically extracts and categorizes information from documents",
      icon: <Bot className="h-8 w-8 text-primary" />,
      status: "Active",
      taskCount: 47
    },
    {
      name: "Code Generation Agent",
      description: "Assists with software development and code reviews",
      icon: <Code className="h-8 w-8 text-primary" />,
      status: "Standby",
      taskCount: 12
    },
    {
      name: "Research Assistant",
      description: "Conducts research and summarizes findings for team members",
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      status: "Active",
      taskCount: 31
    },
    {
      name: "Organizational Network Analyzer",
      description: "Maps team connections and identifies collaboration opportunities",
      icon: <Database className="h-8 w-8 text-primary" />,
      status: "Active",
      taskCount: 18
    },
    {
      name: "Talent Insights Agent",
      description: "Identifies employee strengths and suggests optimal team compositions",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      status: "Active",
      taskCount: 29
    },
    {
      name: "Knowledge Discovery Bot",
      description: "Searches internal documentation to answer employee questions",
      icon: <Search className="h-8 w-8 text-primary" />,
      status: "Standby",
      taskCount: 36
    },
    {
      name: "Communication Assistant",
      description: "Helps draft emails and documentation with consistent messaging",
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      status: "Active",
      taskCount: 42
    }
  ];

  return (
    <div className="container p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          Deploy New Agent
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-medium">{agent.name}</CardTitle>
              {agent.icon}
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground mb-4">
                {agent.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full ${agent.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}`}>
                  {agent.status}
                </span>
                <span className="text-muted-foreground">
                  {agent.taskCount} tasks completed
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIAgents;
