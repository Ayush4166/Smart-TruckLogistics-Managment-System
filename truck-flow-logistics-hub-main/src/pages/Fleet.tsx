
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FleetOverview } from "@/components/dashboard/FleetOverview";
import { Map } from "@/components/dashboard/Map";
import { toast } from "sonner";
import { trucks } from "@/data/mockData";

const Fleet = () => {
  const [activeTrucks, setActiveTrucks] = useState(trucks);
  const [selectedTruckId, setSelectedTruckId] = useState<number | null>(null);
  
  // Handle truck selection for highlighting on map
  const handleTruckSelect = (truckId: number) => {
    setSelectedTruckId(truckId);
    toast.info(`Truck #${truckId} selected`);
  };

  // Update truck status (for maintenance, issues, etc.)
  const updateTruckStatus = (truckId: number, status: string) => {
    const updatedTrucks = activeTrucks.map(truck => 
      truck.id === truckId ? { ...truck, status } : truck
    );
    setActiveTrucks(updatedTrucks);
    toast.success(`Truck #${truckId} status updated to ${status}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <DashboardHeader notificationCount={2} />
        
        <h1 className="text-2xl font-bold mb-6">Fleet Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Map 
              trucks={activeTrucks}
              selectedTruckId={selectedTruckId}
              shipments={[]}
              selectedShipmentId={null}
            />
          </div>
          <div>
            <FleetOverview 
              trucks={activeTrucks}
              onTruckSelect={handleTruckSelect}
              onStatusUpdate={updateTruckStatus}
            />
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeTrucks.map((truck) => (
                  <tr key={truck.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{truck.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">2025-03-15</td>
                    <td className="px-6 py-4 whitespace-nowrap">2025-05-15</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        truck.status === 'active' ? 'bg-green-100 text-green-800' : 
                        truck.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {truck.status.charAt(0).toUpperCase() + truck.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-logistics-blue">
                      <button 
                        onClick={() => handleTruckSelect(truck.id)}
                        className="mr-2 hover:underline"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => toast.info(`Scheduled maintenance for ${truck.name}`)}
                        className="hover:underline"
                      >
                        Schedule
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
