
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { trucks, shipments, deliveryData, fuelData } from "@/data/mockData";
import { Calendar, ChevronDown } from "lucide-react";

const timeRanges = ["Last 7 days", "Last 30 days", "Last 90 days", "This year", "Custom"];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("Last 30 days");
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <DashboardHeader notificationCount={0} />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <div className="relative">
            <button 
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-600"
              onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
            >
              <Calendar size={18} />
              {timeRange}
              <ChevronDown size={16} />
            </button>
            
            {showTimeRangeDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {timeRanges.map((range) => (
                    <li 
                      key={range}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setTimeRange(range);
                        setShowTimeRangeDropdown(false);
                      }}
                    >
                      {range}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">Total Deliveries</h3>
            <p className="text-3xl font-bold">247</p>
            <p className="text-green-500 text-sm mt-2">↑ 12% from last period</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">On-Time Delivery</h3>
            <p className="text-3xl font-bold">94%</p>
            <p className="text-green-500 text-sm mt-2">↑ 3% from last period</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">Avg Fuel Consumption</h3>
            <p className="text-3xl font-bold">8.2 <span className="text-lg">gal/100mi</span></p>
            <p className="text-red-500 text-sm mt-2">↓ 1.5% from last period</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">Driver Satisfaction</h3>
            <p className="text-3xl font-bold">4.8/5</p>
            <p className="text-green-500 text-sm mt-2">↑ 0.2 from last period</p>
          </div>
        </div>
        
        {/* Performance Metrics Charts */}
        <PerformanceMetrics 
          trucks={trucks}
          shipments={shipments}
        />
        
        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Top Drivers</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deliveries</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">John Smith</td>
                    <td className="px-4 py-3 whitespace-nowrap">45</td>
                    <td className="px-4 py-3 whitespace-nowrap">96%</td>
                    <td className="px-4 py-3 whitespace-nowrap">4.9</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Maria Rodriguez</td>
                    <td className="px-4 py-3 whitespace-nowrap">42</td>
                    <td className="px-4 py-3 whitespace-nowrap">94%</td>
                    <td className="px-4 py-3 whitespace-nowrap">4.8</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">David Johnson</td>
                    <td className="px-4 py-3 whitespace-nowrap">38</td>
                    <td className="px-4 py-3 whitespace-nowrap">91%</td>
                    <td className="px-4 py-3 whitespace-nowrap">4.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Popular Routes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipments</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Atlanta to Miami</td>
                    <td className="px-4 py-3 whitespace-nowrap">28</td>
                    <td className="px-4 py-3 whitespace-nowrap">8.5 hrs</td>
                    <td className="px-4 py-3 whitespace-nowrap">$15,400</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Chicago to Detroit</td>
                    <td className="px-4 py-3 whitespace-nowrap">24</td>
                    <td className="px-4 py-3 whitespace-nowrap">4.2 hrs</td>
                    <td className="px-4 py-3 whitespace-nowrap">$10,800</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Dallas to Houston</td>
                    <td className="px-4 py-3 whitespace-nowrap">22</td>
                    <td className="px-4 py-3 whitespace-nowrap">3.8 hrs</td>
                    <td className="px-4 py-3 whitespace-nowrap">$8,900</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
