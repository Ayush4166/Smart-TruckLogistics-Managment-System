
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ShipmentTracker } from "@/components/shipments/ShipmentTracker";
import { Map } from "@/components/dashboard/Map";
import { toast } from "sonner";
import { shipments as initialShipments } from "@/data/mockData";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { NewShipmentForm } from "@/components/shipments/NewShipmentForm";
import type { ShipmentData } from "@/types/shipment";
import { Button } from "@/components/ui/button";

// Generate a unique shipment ID
const generateShipmentId = () => {
  return `SH-${Math.floor(1000 + Math.random() * 9000)}`;
};

// Get current date and date 3 days from now
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString();
};

const getFutureDate = (daysFromNow = 3) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
};

// Interface for shipment form values
interface ShipmentFormValues {
  origin: string;
  destination: string;
  customer: string;
  cargo: string;
  weight: string;
}

const Shipments = () => {
  const [activeShipments, setActiveShipments] = useState<ShipmentData[]>([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewShipmentModalOpen, setIsNewShipmentModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState<string | null>(null);

  // Load shipments from local storage on initial render
  useEffect(() => {
    const storedShipments = localStorage.getItem('logistics-shipments');
    if (storedShipments) {
      setActiveShipments(JSON.parse(storedShipments));
    } else {
      setActiveShipments(initialShipments);
      localStorage.setItem('logistics-shipments', JSON.stringify(initialShipments));
    }
  }, []);

  // Save shipments to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('logistics-shipments', JSON.stringify(activeShipments));
  }, [activeShipments]);

  const handleShipmentSelect = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
    const shipment = activeShipments.find(s => s.id === shipmentId);
    if (shipment) {
      toast.info(`Shipment ${shipmentId} selected: ${shipment.origin} to ${shipment.destination}`);
    }
  };

  const updateShipmentStatus = (shipmentId: string, status: string, progress: number) => {
    const updatedShipments = activeShipments.map(shipment => 
      shipment.id === shipmentId ? { ...shipment, status, progress } : shipment
    );
    setActiveShipments(updatedShipments);
    toast.success(`Shipment ${shipmentId} updated to ${status}`);
    
    // Update drivers if shipment is delivered
    if (status === 'delivered') {
      const shipment = activeShipments.find(s => s.id === shipmentId);
      if (shipment && shipment.driverId) {
        const storedDrivers = localStorage.getItem('logistics-drivers');
        if (storedDrivers) {
          const drivers = JSON.parse(storedDrivers);
          const updatedDrivers = drivers.map((driver: any) => {
            if (driver.id === shipment.driverId) {
              return { ...driver, currentShipment: null };
            }
            return driver;
          });
          localStorage.setItem('logistics-drivers', JSON.stringify(updatedDrivers));
        }
      }
    }
  };

  const confirmDeleteShipment = (shipmentId: string) => {
    setShipmentToDelete(shipmentId);
    setIsDeleteConfirmOpen(true);
  };

  const removeShipment = (shipmentId: string) => {
    // First check if the shipment is assigned to a driver
    const shipment = activeShipments.find(s => s.id === shipmentId);
    if (shipment && shipment.driverId) {
      // Update driver to remove assigned shipment
      const storedDrivers = localStorage.getItem('logistics-drivers');
      if (storedDrivers) {
        const drivers = JSON.parse(storedDrivers);
        const updatedDrivers = drivers.map((driver: any) => {
          if (driver.id === shipment.driverId) {
            return { ...driver, currentShipment: null };
          }
          return driver;
        });
        localStorage.setItem('logistics-drivers', JSON.stringify(updatedDrivers));
      }
    }
    
    // Remove the shipment
    setActiveShipments(prevShipments => prevShipments.filter(s => s.id !== shipmentId));
    setShipmentToDelete(null);
    setIsDeleteConfirmOpen(false);
    toast.success(`Shipment ${shipmentId} removed successfully`);
  };

  const addNewShipment = (formData: ShipmentFormValues) => {
    const newShipment: ShipmentData = {
      id: generateShipmentId(),
      origin: formData.origin,
      destination: formData.destination,
      customer: formData.customer,
      cargo: formData.cargo,
      weight: formData.weight,
      status: "loading",
      progress: 0,
      departureTime: getCurrentDate(),
      arrivalTime: getFutureDate(),
      driver: "Awaiting Assignment",
      truckId: 0
    };
    
    setActiveShipments(prevShipments => [...prevShipments, newShipment]);
    toast.success(`New shipment ${newShipment.id} created successfully`);
  };

  const filteredShipments = activeShipments.filter(shipment => 
    shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <DashboardHeader notificationCount={activeShipments.filter(s => s.status === 'delayed').length} />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shipments Management</h1>
          <button 
            onClick={() => setIsNewShipmentModalOpen(true)}
            className="flex items-center gap-2 bg-logistics-blue text-white px-4 py-2 rounded-md"
          >
            <PlusCircle size={16} />
            New Shipment
          </button>
        </div>

        <Dialog open={isNewShipmentModalOpen} onOpenChange={setIsNewShipmentModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Shipment</DialogTitle>
              <DialogDescription>Enter the shipment details to create a new delivery order.</DialogDescription>
            </DialogHeader>
            <NewShipmentForm 
              onClose={() => setIsNewShipmentModalOpen(false)} 
              onAddShipment={addNewShipment}
            />
          </DialogContent>
        </Dialog>
        
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>Are you sure you want to delete this shipment? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
              <Button 
                variant="destructive"
                onClick={() => shipmentToDelete && removeShipment(shipmentToDelete)}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="mb-6 flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search shipments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => toast.info("Filter clicked")}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-600"
          >
            <Filter size={18} />
            Filter
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Map 
              trucks={[]}
              selectedTruckId={null}
              shipments={activeShipments}
              selectedShipmentId={selectedShipmentId}
            />
          </div>
          <div>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Shipment Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>In Transit</span>
                  <span className="bg-logistics-teal-light/20 text-logistics-teal px-2 py-1 rounded-full text-sm">
                    {activeShipments.filter(s => s.status === 'in-transit').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Loading</span>
                  <span className="bg-logistics-orange-light/20 text-logistics-orange px-2 py-1 rounded-full text-sm">
                    {activeShipments.filter(s => s.status === 'loading').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivered</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
                    {activeShipments.filter(s => s.status === 'delivered').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delayed</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
                    {activeShipments.filter(s => s.status === 'delayed').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ShipmentTracker 
          shipments={filteredShipments}
          onShipmentSelect={handleShipmentSelect}
          onStatusUpdate={updateShipmentStatus}
          onRemoveShipment={confirmDeleteShipment}
        />
      </div>
    </div>
  );
};

export default Shipments;
