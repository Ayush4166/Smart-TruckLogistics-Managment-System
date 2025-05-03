
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bell, Mail, Lock, User, MapPin, Building, Globe, Save } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // Form states
  const [companyName, setCompanyName] = useState("TruckFlow Logistics");
  const [email, setEmail] = useState("admin@truckflow.com");
  const [phone, setPhone] = useState("555-123-4567");
  const [address, setAddress] = useState("123 Logistics Way, Atlanta, GA 30308");
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    dailyReports: true,
    delayedShipments: true,
    maintenanceAlerts: true,
    driverUpdates: false
  });
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <DashboardHeader notificationCount={0} />
        
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow">
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                      activeTab === "general" ? "bg-logistics-blue text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    <Building size={18} />
                    Company Information
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                      activeTab === "notifications" ? "bg-logistics-blue text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell size={18} />
                    Notifications
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                      activeTab === "account" ? "bg-logistics-blue text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("account")}
                  >
                    <User size={18} />
                    Account
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 ${
                      activeTab === "integration" ? "bg-logistics-blue text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("integration")}
                  >
                    <Globe size={18} />
                    Integrations
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {activeTab === "general" && (
              <>
                <h2 className="text-xl font-semibold mb-6">Company Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className="flex items-center gap-2 bg-logistics-blue text-white px-4 py-2 rounded-md"
                    onClick={saveSettings}
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </>
            )}
            
            {activeTab === "notifications" && (
              <>
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-logistics-blue" />
                      <Label htmlFor="emailAlerts">Email Alerts</Label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.emailAlerts}
                        onChange={() => handleNotificationToggle('emailAlerts')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-logistics-blue"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-logistics-blue" />
                      <Label htmlFor="smsAlerts">SMS Alerts</Label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.smsAlerts}
                        onChange={() => handleNotificationToggle('smsAlerts')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-logistics-blue"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-logistics-blue" />
                      <Label htmlFor="dailyReports">Daily Reports</Label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.dailyReports}
                        onChange={() => handleNotificationToggle('dailyReports')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-logistics-blue"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell size={18} className="text-logistics-blue" />
                      <Label htmlFor="delayedShipments">Delayed Shipments</Label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.delayedShipments}
                        onChange={() => handleNotificationToggle('delayedShipments')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-logistics-blue"></div>
                    </label>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className="flex items-center gap-2 bg-logistics-blue text-white px-4 py-2 rounded-md"
                    onClick={saveSettings}
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </>
            )}
            
            {activeTab === "account" && (
              <>
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className="flex items-center gap-2 bg-logistics-blue text-white px-4 py-2 rounded-md"
                    onClick={() => toast.success("Password updated successfully")}
                  >
                    <Lock size={18} />
                    Update Password
                  </button>
                </div>
              </>
            )}
            
            {activeTab === "integration" && (
              <>
                <h2 className="text-xl font-semibold mb-6">API Integrations</h2>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <MapPin size={24} className="text-logistics-blue" />
                        <div>
                          <h3 className="font-medium">Google Maps API</h3>
                          <p className="text-sm text-gray-500">Used for mapping and route optimization</p>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <Mail size={24} className="text-logistics-blue" />
                        <div>
                          <h3 className="font-medium">SendGrid API</h3>
                          <p className="text-sm text-gray-500">Used for email notifications</p>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Needs Setup</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button 
                        className="text-sm text-logistics-blue hover:underline"
                        onClick={() => toast.info("Configure SendGrid API clicked")}
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
