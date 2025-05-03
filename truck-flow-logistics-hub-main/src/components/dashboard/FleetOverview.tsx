
import { Truck, Settings, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface TruckData {
  id: number;
  name: string;
  status: string;
  driver: string;
  fuelLevel: number;
  mileage: number;
}

interface FleetOverviewProps {
  trucks: TruckData[];
  onTruckSelect: (id: number) => void;
  onStatusUpdate: (id: number, status: string) => void;
}

export function FleetOverview({ trucks, onTruckSelect, onStatusUpdate }: FleetOverviewProps) {
  const [showDetails, setShowDetails] = useState<number | null>(null);

  const fleetStats = [
    { label: 'Total Trucks', value: trucks.length, status: 'normal' },
    { label: 'Active', value: trucks.filter(t => t.status === 'active').length, status: 'success' },
    { label: 'Maintenance', value: trucks.filter(t => t.status === 'maintenance' || t.status === 'warning').length, status: 'warning' },
    { label: 'Issues', value: trucks.filter(t => t.status === 'inactive').length, status: 'danger' },
  ];

  const toggleDetails = (truckId: number) => {
    if (showDetails === truckId) {
      setShowDetails(null);
    } else {
      setShowDetails(truckId);
      onTruckSelect(truckId);
    }
  };
  
  const handleStatusUpdate = (truckId: number, newStatus: string) => {
    onStatusUpdate(truckId, newStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-logistics-blue mb-4">Fleet Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {fleetStats.map((stat) => (
          <div 
            key={stat.label} 
            className="p-4 rounded-lg border flex flex-col justify-between"
            style={{
              borderColor: stat.status === 'danger' 
                ? '#EF4444' 
                : stat.status === 'warning' 
                  ? '#F59E0B' 
                  : stat.status === 'success' 
                    ? '#22C55E' 
                    : '#E5E7EB'
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <Truck 
                className="h-5 w-5" 
                style={{ 
                  color: stat.status === 'danger' 
                    ? '#EF4444' 
                    : stat.status === 'warning' 
                      ? '#F59E0B' 
                      : stat.status === 'success' 
                        ? '#22C55E' 
                        : '#1A365D'
                }}
              />
            </div>
            <div className="text-2xl font-bold mt-2">{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="text-md font-medium mb-2">Truck Status</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {trucks.map(truck => (
            <div key={truck.id} className="border rounded-lg p-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDetails(truck.id)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className={`h-3 w-3 rounded-full ${
                      truck.status === 'active' 
                        ? 'bg-green-500' 
                        : truck.status === 'warning' || truck.status === 'maintenance'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  ></div>
                  <span>{truck.name}</span>
                </div>
                <div className="text-sm text-gray-500">{truck.driver}</div>
              </div>
              
              {showDetails === truck.id && (
                <div className="mt-2 border-t pt-2">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="text-sm">
                      <span className="text-gray-500">Fuel:</span> {truck.fuelLevel}%
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Mileage:</span> {truck.mileage}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button 
                      className="bg-logistics-blue text-white px-2 py-1 rounded-md text-xs flex items-center gap-1"
                      onClick={() => onTruckSelect(truck.id)}
                    >
                      <Truck className="h-3 w-3" />
                      Track
                    </button>
                    <button 
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1"
                      onClick={() => handleStatusUpdate(truck.id, 'maintenance')}
                    >
                      <Settings className="h-3 w-3" />
                      Maintenance
                    </button>
                    <button 
                      className="bg-red-500 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1"
                      onClick={() => handleStatusUpdate(truck.id, 'inactive')}
                    >
                      <AlertTriangle className="h-3 w-3" />
                      Report Issue
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
