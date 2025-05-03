
import { Bell, MessageSquare, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  notificationCount?: number;
}

export function DashboardHeader({ notificationCount = 0 }: DashboardHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Close user menu if open
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    // Close notifications if open
    if (showNotifications) setShowNotifications(false);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-logistics-blue">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell 
            className="h-6 w-6 text-gray-500 hover:text-logistics-blue cursor-pointer" 
            onClick={toggleNotifications}
          />
          {notificationCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-logistics-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </div>
          )}
          
          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
              <div className="p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificationCount > 0 ? (
                  <div className="p-3 border-b hover:bg-gray-50">
                    <p className="text-sm font-medium">Delayed Shipment Alert</p>
                    <p className="text-xs text-gray-500">Shipment SH-7805 is behind schedule</p>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No new notifications
                  </div>
                )}
              </div>
              <div className="p-2 text-center border-t">
                <button 
                  className="text-logistics-teal text-sm hover:underline"
                  onClick={() => {
                    setShowNotifications(false);
                    toast.info("View all notifications clicked");
                  }}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <MessageSquare 
            className="h-6 w-6 text-gray-500 hover:text-logistics-blue cursor-pointer" 
            onClick={() => toast.info("Messages clicked")}
          />
        </div>
        
        <div className="relative">
          <div 
            className="h-10 w-10 bg-logistics-blue rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
            onClick={toggleUserMenu}
          >
            A
          </div>
          
          {/* User menu dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="p-3 border-b">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@truckflow.com</p>
              </div>
              <div className="py-1">
                <button 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <button 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full"
                  onClick={() => {
                    toast.info("View profile clicked");
                    setShowUserMenu(false);
                  }}
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </button>
                <button 
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
