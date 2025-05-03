
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { toast } from "sonner";
import { Search, PlusCircle, MapPin, Calendar, CheckCircle, Clock, AlertTriangle, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { NewDriverForm } from "@/components/drivers/NewDriverForm";
import { Button } from "@/components/ui/button";
import type { ShipmentData } from "@/types/shipment";

// Mock driver data
const driversData = [
  { id: 1, name: "John Smith", phone: "555-123-4567", email: "john.smith@example.com", status: "active", currentShipment: "SH-7802", location: "Atlanta, GA", performance: 95 },
  { id: 2, name: "Maria Rodriguez", phone: "555-234-5678", email: "maria.rodriguez@example.com", status: "active", currentShipment: "SH-7803", location: "Dallas, TX", performance: 92 },
  { id: 3, name: "David Johnson", phone: "555-345-6789", email: "david.johnson@example.com", status: "break", currentShipment: null, location: "Chicago, IL", performance: 88 },
  { id: 4, name: "Sarah Williams", phone: "555-456-7890", email: "sarah.williams@example.com", status: "active", currentShipment: "SH-7805", location: "New York, NY", performance: 90 },
  { id: 5, name: "Michael Brown", phone: "555-567-8901", email: "michael.brown@example.com", status: "off-duty", currentShipment: null, location: "Los Angeles, CA", performance: 87 },
];

// Interface for driver data
interface Driver {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  currentShipment: string | null;
  location: string;
  performance: number;
}

interface DriverFormValues {
  name: string;
  phone: string;
  email: string;
  location: string;
}

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] = useState(false);
  const [isAssignShipmentModalOpen, setIsAssignShipmentModalOpen] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [availableShipments, setAvailableShipments] = useState<ShipmentData[]>([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<number | null>(null);
  
  // Load drivers from local storage on initial render
  useEffect(() => {
    const storedDrivers = localStorage.getItem('logistics-drivers');
    if (storedDrivers) {
      setDrivers(JSON.parse(storedDrivers));
    } else {
      setDrivers(driversData);
      localStorage.setItem('logistics-drivers', JSON.stringify(driversData));
    }
    
    // Get available shipments
    refreshAvailableShipments();
  }, []);
  
  // Save drivers to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('logistics-drivers', JSON.stringify(drivers));
  }, [drivers]);

  // Refresh the list of available shipments
  const refreshAvailableShipments = () => {
    const storedShipments = localStorage.getItem('logistics-shipments');
    if (storedShipments) {
      const shipments = JSON.parse(storedShipments);
      const unassignedShipments = shipments.filter((s: ShipmentData) => 
        s.driver === "Awaiting Assignment" || s.driver === ""
      );
      setAvailableShipments(unassignedShipments);
    }
  };

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle driver selection
  const handleDriverSelect = (driverId: number) => {
    setSelectedDriverId(driverId === selectedDriverId ? null : driverId);
  };

  // Update driver status
  const updateDriverStatus = (driverId: number, status: string) => {
    const updatedDrivers = drivers.map(driver => 
      driver.id === driverId ? { ...driver, status } : driver
    );
    setDrivers(updatedDrivers);
    toast.success(`Driver status updated to ${status}`);
  };

  // Confirm driver removal
  const confirmDeleteDriver = (driverId: number) => {
    setDriverToDelete(driverId);
    setIsDeleteConfirmOpen(true);
  };

  // Remove driver
  const removeDriver = () => {
    if (!driverToDelete) return;
    
    const driverToRemove = drivers.find(d => d.id === driverToDelete);
    if (driverToRemove?.currentShipment) {
      // Update the shipment to unassign the driver
      const storedShipments = localStorage.getItem('logistics-shipments');
      if (storedShipments) {
        const shipments = JSON.parse(storedShipments);
        const updatedShipments = shipments.map((s: ShipmentData) => 
          s.id === driverToRemove.currentShipment 
            ? { ...s, driver: "Awaiting Assignment", driverId: undefined } 
            : s
        );
        localStorage.setItem('logistics-shipments', JSON.stringify(updatedShipments));
      }
    }
    
    setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== driverToDelete));
    setDriverToDelete(null);
    setIsDeleteConfirmOpen(false);
    toast.success("Driver removed successfully");
    refreshAvailableShipments();
  };

  // Add new driver
  const addDriver = (driverData: DriverFormValues) => {
    const newDriver: Driver = {
      id: drivers.length > 0 ? Math.max(...drivers.map(d => d.id)) + 1 : 1,
      name: driverData.name,
      phone: driverData.phone,
      email: driverData.email,
      location: driverData.location,
      status: "active",
      currentShipment: null,
      performance: 85 // Default performance score for new drivers
    };
    
    setDrivers(prevDrivers => [...prevDrivers, newDriver]);
    toast.success(`Driver ${driverData.name} added successfully`);
  };
  
  // Assign shipment to driver
  const assignShipment = (driverId: number, shipmentId: string) => {
    // Update driver with shipment ID
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) {
      toast.error("Driver not found");
      return;
    }
    
    const updatedDrivers = drivers.map(driver => 
      driver.id === driverId ? { ...driver, currentShipment: shipmentId } : driver
    );
    setDrivers(updatedDrivers);
    
    // Update shipment with driver details
    const storedShipments = localStorage.getItem('logistics-shipments');
    if (storedShipments) {
      const shipments = JSON.parse(storedShipments);
      
      const updatedShipments = shipments.map((s: ShipmentData) => 
        s.id === shipmentId 
          ? { ...s, driver: driver.name, driverId: driver.id } 
          : s
      );
      localStorage.setItem('logistics-shipments', JSON.stringify(updatedShipments));
      
      // Update available shipments list
      refreshAvailableShipments();
    }
    
    setSelectedShipmentId(null);
    setIsAssignShipmentModalOpen(false);
    toast.success(`Shipment ${shipmentId} assigned to ${driver.name}`);
  };

  // Open assign shipment modal
  const openAssignShipmentModal = (driverId: number) => {
    setSelectedDriverId(driverId);
    setIsAssignShipmentModalOpen(true);
    refreshAvailableShipments();
  };

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'break':
        return 'bg-blue-100 text-blue-700';
      case 'off-duty':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'break':
        return <Clock className="h-4 w-4" />;
      case 'off-duty':
        return <Calendar className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <DashboardHeader notificationCount={1} />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Driver Management</h1>
          <button 
            onClick={() => setIsNewDriverModalOpen(true)}
            className="flex items-center gap-2 bg-logistics-blue text-white px-4 py-2 rounded-md"
          >
            <PlusCircle size={16} />
            Add Driver
          </button>
        </div>

        <Dialog open={isNewDriverModalOpen} onOpenChange={setIsNewDriverModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>Fill in the details to add a new driver to the fleet.</DialogDescription>
            </DialogHeader>
            <NewDriverForm 
              onClose={() => setIsNewDriverModalOpen(false)} 
              onAddDriver={addDriver}
            />
          </DialogContent>
        </Dialog>
        
        <Dialog open={isAssignShipmentModalOpen} onOpenChange={setIsAssignShipmentModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Shipment</DialogTitle>
              <DialogDescription>
                Select a shipment to assign to {drivers.find(d => d.id === selectedDriverId)?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {availableShipments.length > 0 ? (
                <div className="space-y-3">
                  {availableShipments.map((shipment) => (
                    <div 
                      key={shipment.id} 
                      className={`border p-3 rounded-md cursor-pointer flex justify-between items-center ${selectedShipmentId === shipment.id ? 'border-logistics-blue bg-blue-50' : ''}`}
                      onClick={() => setSelectedShipmentId(shipment.id)}
                    >
                      <div>
                        <div className="font-medium">{shipment.id}</div>
                        <div className="text-sm text-gray-500">
                          {shipment.origin} to {shipment.destination}
                        </div>
                      </div>
                      {selectedShipmentId === shipment.id && (
                        <CheckCircle className="text-logistics-blue" size={18} />
                      )}
                    </div>
                  ))}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAssignShipmentModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => selectedDriverId && selectedShipmentId && assignShipment(selectedDriverId, selectedShipmentId)}
                      disabled={!selectedShipmentId}
                    >
                      Assign Shipment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No available shipments to assign</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this driver? Any assigned shipments will be unassigned.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={removeDriver}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search drivers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Driver Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Drivers</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
                  {drivers.filter(d => d.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>On Break</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                  {drivers.filter(d => d.status === 'break').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Off-Duty</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {drivers.filter(d => d.status === 'off-duty').length}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Driver Performance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDrivers.map((driver) => (
                    <tr key={`performance-${driver.id}`}>
                      <td className="px-2 py-4 whitespace-nowrap">{driver.name}</td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                driver.performance > 90 ? 'bg-green-500' :
                                driver.performance > 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${driver.performance}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">{driver.performance}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Driver List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Shipment</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDrivers.map((driver) => (
                  <tr 
                    key={driver.id}
                    className={selectedDriverId === driver.id ? "bg-blue-50" : ""}
                    onClick={() => handleDriverSelect(driver.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{driver.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{driver.phone}</div>
                      <div className="text-sm text-gray-500">{driver.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1 ${getStatusBadgeClass(driver.status)}`}>
                        {getStatusIcon(driver.status)}
                        {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {driver.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {driver.currentShipment ? (
                        <span className="text-sm text-logistics-teal font-medium">{driver.currentShipment}</span>
                      ) : (
                        <span className="text-sm text-gray-500">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          className="text-logistics-teal hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info(`View ${driver.name}'s profile`);
                          }}
                        >
                          View
                        </button>
                        {!driver.currentShipment && (
                          <button 
                            className="text-logistics-blue hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              openAssignShipmentModal(driver.id);
                            }}
                          >
                            Assign
                          </button>
                        )}
                        <button 
                          className="text-logistics-orange hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateDriverStatus(driver.id, driver.status === 'break' ? 'active' : 'break');
                          }}
                        >
                          {driver.status === 'break' ? 'Activate' : 'Break'}
                        </button>
                        <button 
                          className="text-red-500 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteDriver(driver.id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
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

export default Drivers;
