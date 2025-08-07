import React, { useState } from 'react';
import { KanbanIcon, Plus, MoreVertical, Calendar, MessageSquare, Users, Clock, Archive } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const AgentTasks = () => {
  // Sample tasks data
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 't1',
          title: 'Data analysis for Q2 employee performance',
          description: 'Generate productivity metrics and identify key trends in employee performance across departments.',
          priority: 'high',
          tags: ['Data Analysis', 'Reports'],
          assignedTo: ['data-agent'],
          dueDate: '2025-07-15',
          comments: 2,
        },
        {
          id: 't2',
          title: 'Security scan of new codebase',
          description: 'Perform security analysis of the BlockchainVisualization component and identify potential vulnerabilities.',
          priority: 'medium',
          tags: ['Security', 'Code Review'],
          assignedTo: ['security-agent'],
          dueDate: '2025-07-12',
          comments: 0,
        },
        {
          id: 't3',
          title: 'Schedule team onboarding meetings',
          description: 'Coordinate with HR to schedule welcome meetings for new employees joining next week.',
          priority: 'low',
          tags: ['HR', 'Scheduling'],
          assignedTo: ['assistant-agent'],
          dueDate: '2025-07-10',
          comments: 4,
        },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        {
          id: 't4',
          title: 'Optimize Midnight department data flows',
          description: 'Analyze and improve data processing for the Midnight department to reduce latency by 20%.',
          priority: 'high',
          tags: ['Optimization', 'Midnight'],
          assignedTo: ['optimization-agent', 'data-agent'],
          dueDate: '2025-07-14',
          comments: 5,
        },
        {
          id: 't5',
          title: 'Generate monthly resource allocation report',
          description: 'Compile resource usage across departments and suggest optimizations for next quarter.',
          priority: 'medium',
          tags: ['Reports', 'Planning'],
          assignedTo: ['data-agent'],
          dueDate: '2025-07-20',
          comments: 2,
        },
      ],
    },
    {
      id: 'review',
      title: 'In Review',
      tasks: [
        {
          id: 't6',
          title: 'New employee orientation materials',
          description: 'Update onboarding documentation for the engineering department with latest processes.',
          priority: 'medium',
          tags: ['Documentation', 'HR'],
          assignedTo: ['content-agent'],
          dueDate: '2025-07-08',
          comments: 8,
        },
        {
          id: 't7',
          title: 'Research visualization improvements',
          description: 'Explore alternative visualization techniques for large organizational structures.',
          priority: 'low',
          tags: ['Research', 'Visualization'],
          assignedTo: ['research-agent'],
          dueDate: '2025-07-09',
          comments: 3,
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 't8',
          title: 'Create initial column layout for Kanban',
          description: 'Set up the default Kanban structure with predefined columns to support basic task workflow.',
          priority: 'high',
          tags: ['UI', 'Development'],
          assignedTo: ['dev-agent'],
          dueDate: '2025-07-07',
          comments: 6,
          completed: true,
        },
        {
          id: 't9',
          title: 'Document API endpoints for task operations',
          description: 'Create clear documentation for task-related CRUD operations and API endpoints.',
          priority: 'medium',
          tags: ['API', 'Documentation'],
          assignedTo: ['doc-agent'],
          dueDate: '2025-07-05',
          comments: 1,
          completed: true,
        },
      ],
    },
  ]);

  // Function to handle drag start
  const handleDragStart = (e, taskId, columnId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumnId', columnId);
  };

  // Function to handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop
  const handleDrop = (e, targetColumnId) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');

    if (sourceColumnId === targetColumnId) return;

    setColumns(prevColumns => {
      // Create a copy of the columns
      const newColumns = [...prevColumns];

      // Find the source and target columns
      const sourceColumn = newColumns.find(col => col.id === sourceColumnId);
      const targetColumn = newColumns.find(col => col.id === targetColumnId);

      // Find the task to move
      const taskToMove = sourceColumn.tasks.find(task => task.id === taskId);

      // Remove the task from the source column
      sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== taskId);

      // Add the task to the target column
      targetColumn.tasks = [...targetColumn.tasks, taskToMove];

      return newColumns;
    });
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500 text-xs">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  // Get agent avatar
  const getAgentAvatar = (agentId) => {
    const agentColors = {
      'data-agent': 'bg-blue-500',
      'security-agent': 'bg-red-500',
      'assistant-agent': 'bg-green-500',
      'optimization-agent': 'bg-purple-500',
      'content-agent': 'bg-amber-500',
      'research-agent': 'bg-indigo-500',
      'dev-agent': 'bg-teal-500',
      'doc-agent': 'bg-rose-500',
    };

    return (
      <span className={`inline-flex items-center justify-center rounded-full w-6 h-6 ${agentColors[agentId]} text-white text-xs`}>
        {agentId.charAt(0).toUpperCase()}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <KanbanIcon className="mr-2 h-8 w-8" /> Agent Tasks
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage and track AI agent tasks across different stages
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
          <Plus className="h-4 w-4 mr-2" /> New Task
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div
            key={column.id}
            className="flex-shrink-0 w-[300px] bg-muted/30 rounded-lg p-3"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">
                {column.title} <span className="text-muted-foreground ml-1">({column.tasks.length})</span>
              </h3>
              <div className="flex items-center">
                <button className="p-1 hover:bg-muted rounded">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-muted rounded">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  className="bg-card text-card-foreground p-3 rounded-md shadow-sm border cursor-grab"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    {getPriorityBadge(task.priority)}
                    <button className="text-muted-foreground hover:text-foreground p-1">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="font-medium mb-1">{task.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{task.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                    <div className="flex -space-x-2">
                      {task.assignedTo.map(agent => (
                        <div key={agent} className="tooltip" data-tip={agent}>
                          {getAgentAvatar(agent)}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {task.dueDate.split('-')[2]}/{task.dueDate.split('-')[1]}
                      </span>
                      {task.comments > 0 && (
                        <span className="flex items-center">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          {task.comments}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {column.tasks.length === 0 && (
              <div className="text-center py-8 border border-dashed rounded-md bg-muted/30">
                <p className="text-sm text-muted-foreground">Drop tasks here</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentTasks;
