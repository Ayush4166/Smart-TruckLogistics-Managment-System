
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Truck, Package, Users, BarChart, Settings, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <MapPin className="h-5 w-5" />, path: '/' },
    { name: 'Fleet', icon: <Truck className="h-5 w-5" />, path: '/fleet' },
    { name: 'Shipments', icon: <Package className="h-5 w-5" />, path: '/shipments' },
    { name: 'Drivers', icon: <Users className="h-5 w-5" />, path: '/drivers' },
    { name: 'Analytics', icon: <BarChart className="h-5 w-5" />, path: '/analytics' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-logistics-blue transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-logistics-blue-light">
        {!collapsed && (
          <div className="text-white font-bold text-xl">
            TruckFlow
          </div>
        )}
        <button
          className="text-white hover:text-logistics-teal transition"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <Menu className="h-6 w-6" />
          ) : (
            <X className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md transition-all",
                  isActive(item.path) 
                    ? "bg-logistics-blue-light text-white" 
                    : "text-white hover:bg-logistics-blue-light"
                )}
              >
                <span className={cn(
                  isActive(item.path) ? "text-white" : "text-logistics-teal"
                )}>
                  {item.icon}
                </span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-logistics-blue-light">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-logistics-blue font-bold">
              A
            </div>
            <div className="text-white">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-300">Logistics Manager</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
