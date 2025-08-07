import { HomeIcon, LayoutDashboardIcon, FileBarChart2Icon, SettingsIcon, BotIcon, ClipboardListIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import AIAgents from "./pages/AIAgents.jsx";
import AgentTasks from "./pages/AgentTasks.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboardIcon className="h-5 w-5" />,
    page: <Dashboard />,
  },
  {
    title: "Agent Inbox",
    to: "/reports",
    icon: <FileBarChart2Icon className="h-5 w-5" />,
    page: <Reports />,
  },
  {
    title: "AI Agents",
    to: "/ai-agents",
    icon: <BotIcon className="h-5 w-5" />,
    page: <AIAgents />,
  },
  {
    title: "Agent Tasks",
    to: "/agent-tasks",
    icon: <ClipboardListIcon className="h-5 w-5" />,
    page: <AgentTasks />,
  },
  {
    title: "Organization",
    to: "/",
    icon: <HomeIcon className="h-5 w-5" />,
    page: <Index />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-5 w-5" />,
    page: <Settings />,
  },
];
