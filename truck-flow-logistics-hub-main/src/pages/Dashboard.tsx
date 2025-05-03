
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Map } from "@/components/dashboard/Map";
import { FleetOverview } from "@/components/dashboard/FleetOverview";
import { ShipmentTracker } from "@/components/shipments/ShipmentTracker"; // Updated import path
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { Sidebar } from "@/components/layout/Sidebar";
import { toast } from "sonner";

// Mock truck and shipment data to be replaced with API calls later
import { trucks, shipments } from "@/data/mockData";

const Dashboard = () => {
  // State for managing selected truck and shipment
  const [selectedTruckId, setSelectedTruckId] = useState<number | null>(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [activeTrucks, setActiveTrucks] = useState(trucks);
  const [activeShipments, setActiveShipments] = useState(shipments);

  // Handle truck selection for highlighting on map
  const handleTruckSelect = (truckId: number) => {
    setSelectedTruckId(truckId);
    toast.info(`Truck #${truckId} selected`);
  };

  // Handle shipment selection for highlighting on map
  const handleShipmentSelect = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
    const shipment = shipments.find(s => s.id === shipmentId);
    if (shipment) {
      toast.info(`Shipment ${shipmentId} selected: ${shipment.origin} to ${shipment.destination}`);
    }
  };

  // Update truck status (for maintenance, issues, etc.)
  const updateTruckStatus = (truckId: number, status: string) => {
    const updatedTrucks = activeTrucks.map(truck => 
      truck.id === truckId ? { ...truck, status } : truck
    );
    setActiveTrucks(updatedTrucks);
    toast.success(`Truck #${truckId} status updated to ${status}`);
  };

  // Update shipment status (in-transit, delivered, etc.)
  const updateShipmentStatus = (shipmentId: string, status: string, progress: number) => {
    const updatedShipments = activeShipments.map(shipment => 
      shipment.id === shipmentId ? { ...shipment, status, progress } : shipment
    );
    setActiveShipments(updatedShipments);
    toast.success(`Shipment ${shipmentId} updated to ${status}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <DashboardHeader notificationCount={activeShipments.filter(s => s.status === 'delayed').length} />
        
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Map 
                trucks={activeTrucks}
                selectedTruckId={selectedTruckId}
                shipments={activeShipments}
                selectedShipmentId={selectedShipmentId}
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
          
          <ShipmentTracker 
            shipments={activeShipments}
            onShipmentSelect={handleShipmentSelect}
            onStatusUpdate={updateShipmentStatus}
          />
          
          <PerformanceMetrics 
            trucks={activeTrucks}
            shipments={activeShipments}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
