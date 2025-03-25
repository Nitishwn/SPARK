import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  LayoutDashboard,
  Car,
  Users,
  Receipt,
  BarChart,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);
  
  return (
    <div 
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center">
          <span className="text-primary text-xl font-bold">
            {collapsed ? 'S' : 'SPARK'}
          </span>
          {!collapsed && (
            <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
              Smart Parking
            </span>
          )}
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <div className="p-4">
        <nav>
          <ul className="space-y-1">
            <SidebarItem 
              href="/dashboard" 
              icon={LayoutDashboard}
              label="Dashboard"
              active={location === '/dashboard'}
              collapsed={collapsed}
            />
            
            <SidebarItem 
              href="/booking" 
              icon={Car}
              label="Book Parking"
              active={location === '/booking'}
              collapsed={collapsed}
            />
            
            {isAdmin && (
              <>
                <SidebarItem 
                  href="/admin" 
                  icon={Users}
                  label="Users"
                  active={location === '/admin'}
                  collapsed={collapsed}
                />
                
                <SidebarItem 
                  href="/admin/transactions" 
                  icon={Receipt}
                  label="Transactions"
                  active={location === '/admin/transactions'}
                  collapsed={collapsed}
                />
                
                <SidebarItem 
                  href="/admin/analytics" 
                  icon={BarChart}
                  label="Analytics"
                  active={location === '/admin/analytics'}
                  collapsed={collapsed}
                />
                
                <SidebarItem 
                  href="/admin/settings" 
                  icon={Settings}
                  label="Settings"
                  active={location === '/admin/settings'}
                  collapsed={collapsed}
                />
              </>
            )}
          </ul>
        </nav>
      </div>
      
      {!collapsed && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex items-center p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-2 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.fullName?.[0] || user?.username?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.fullName || user?.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed: boolean;
}

function SidebarItem({ href, icon: Icon, label, active, collapsed }: SidebarItemProps) {
  return (
    <li>
      <Link href={href}>
        <a className={`flex items-center p-2 rounded-md ${
          active 
            ? 'bg-blue-50 dark:bg-blue-900/20 text-primary'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}>
          <Icon className="w-5 h-5 mr-3" />
          {!collapsed && <span>{label}</span>}
        </a>
      </Link>
    </li>
  );
}
