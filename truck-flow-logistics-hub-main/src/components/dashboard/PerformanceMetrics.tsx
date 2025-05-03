
import { useState } from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { deliveryData, fuelData } from '@/data/mockData';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PerformanceMetricsProps {
  trucks: any[];
  shipments: any[];
}

export function PerformanceMetrics({ trucks, shipments }: PerformanceMetricsProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');
  
  // Calculate performance stats
  const totalDeliveries = deliveryData.reduce((sum, day) => sum + day.onTime + day.delayed, 0);
  const onTimeDeliveries = deliveryData.reduce((sum, day) => sum + day.onTime, 0);
  const onTimePercentage = Math.round((onTimeDeliveries / totalDeliveries) * 100);
  
  const totalFuel = fuelData.reduce((sum, week) => sum + week.usage, 0);
  const avgFuel = Math.round(totalFuel / fuelData.length);
  
  const activeDrivers = new Set(trucks.filter(t => t.status === 'active').map(t => t.driver)).size;
  
  const changeTimeRange = (range: 'week' | 'month' | 'quarter') => {
    setTimeRange(range);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-logistics-blue">Weekly Deliveries</h2>
          <div className="flex gap-1">
            <button 
              className={`px-2 py-1 text-xs rounded ${timeRange === 'week' ? 'bg-logistics-blue text-white' : 'bg-gray-100'}`}
              onClick={() => changeTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${timeRange === 'month' ? 'bg-logistics-blue text-white' : 'bg-gray-100'}`}
              onClick={() => changeTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${timeRange === 'quarter' ? 'bg-logistics-blue text-white' : 'bg-gray-100'}`}
              onClick={() => changeTimeRange('quarter')}
            >
              Quarter
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-sm text-gray-500">Total Deliveries</p>
            <p className="text-xl font-bold">{totalDeliveries}</p>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>8% from last {timeRange}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-sm text-gray-500">On-Time</p>
            <p className="text-xl font-bold">{onTimePercentage}%</p>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>3% from last {timeRange}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-sm text-gray-500">Active Drivers</p>
            <p className="text-xl font-bold">{activeDrivers}</p>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDown className="h-3 w-3 mr-1" /> 
              <span>1 from last {timeRange}</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={deliveryData}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar name="On Time" dataKey="onTime" stackId="a" fill="#0D9488" />
              <Bar name="Delayed" dataKey="delayed" stackId="a" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-logistics-blue">Fleet Fuel Consumption</h2>
          <div className="flex gap-1">
            <button 
              className={`px-2 py-1 text-xs rounded ${timeRange === 'week' ? 'bg-logistics-blue text-white' : 'bg-gray-100'}`}
              onClick={() => changeTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${timeRange === 'month' ? 'bg-logistics-blue text-white' : 'bg-gray-100'}`}
              onClick={() => changeTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${timeRange === 'quarter' ? 'bg-logistics-blue text-white' : 'bg-gray-100'}`}
              onClick={() => changeTimeRange('quarter')}
            >
              Quarter
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-sm text-gray-500">Total Usage</p>
            <p className="text-xl font-bold">{totalFuel} gal</p>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>12% from last {timeRange}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-sm text-gray-500">Average</p>
            <p className="text-xl font-bold">{avgFuel} gal</p>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>3% from last {timeRange}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-sm text-gray-500">Cost</p>
            <p className="text-xl font-bold">${totalFuel * 3.45}</p>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" /> 
              <span>8% from last {timeRange}</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={fuelData}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line name="Fuel Usage (gal)" type="monotone" dataKey="usage" stroke="#1A365D" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
