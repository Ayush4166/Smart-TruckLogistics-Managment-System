
import { useEffect, useRef, useState } from 'react';
import { Truck, Package, MapPin } from 'lucide-react';

interface TruckData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
}

interface ShipmentData {
  id: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
  truckId: number;
}

interface MapProps {
  trucks: TruckData[];
  selectedTruckId: number | null;
  shipments: ShipmentData[];
  selectedShipmentId: string | null;
}

export function Map({ trucks, selectedTruckId, shipments, selectedShipmentId }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'all' | 'trucks' | 'shipments'>('all');

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (newView: 'all' | 'trucks' | 'shipments') => {
    setView(newView);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[400px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-logistics-blue">Fleet Location</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => handleViewChange('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              view === 'all' 
                ? 'bg-logistics-blue text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => handleViewChange('trucks')}
            className={`px-3 py-1 text-sm rounded-md flex items-center gap-1 ${
              view === 'trucks' 
                ? 'bg-logistics-blue text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Truck className="h-4 w-4" />
            Trucks
          </button>
          <button 
            onClick={() => handleViewChange('shipments')}
            className={`px-3 py-1 text-sm rounded-md flex items-center gap-1 ${
              view === 'shipments' 
                ? 'bg-logistics-blue text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Package className="h-4 w-4" />
            Shipments
          </button>
        </div>
      </div>
      
      <div className="h-[calc(100%-2rem)] w-full relative bg-gray-100 rounded-lg overflow-hidden" ref={mapRef}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-logistics-teal"></div>
          </div>
        ) : (
          <>
            {/* This is a placeholder for the map - in a real app, we'd use a map library */}
            <div className="absolute inset-0 bg-[#e5e9ee]"></div>
            
            {/* Mock roads */}
            <div className="absolute left-1/4 top-0 w-1 h-full bg-gray-300"></div>
            <div className="absolute left-1/2 top-0 w-1 h-full bg-gray-300"></div>
            <div className="absolute left-3/4 top-0 w-1 h-full bg-gray-300"></div>
            <div className="absolute top-1/4 left-0 h-1 w-full bg-gray-300"></div>
            <div className="absolute top-1/2 left-0 h-1 w-full bg-gray-300"></div>
            <div className="absolute top-3/4 left-0 h-1 w-full bg-gray-300"></div>
            
            {/* Mock truck markers - only show if view is 'all' or 'trucks' */}
            {(view === 'all' || view === 'trucks') && trucks.map((truck, index) => {
              const positions = [
                { left: '1/4', top: '1/4' },
                { left: '3/4', top: '1/3' },
                { left: '2/3', top: '2/3' },
                { left: '1/3', top: '3/4' }
              ];
              const position = positions[index % positions.length];
              
              return (
                <div 
                  key={truck.id}
                  className={`absolute left-${position.left} top-${position.top} transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    selectedTruckId === truck.id ? 'scale-150 z-10' : ''
                  }`}
                >
                  <div 
                    className={`h-4 w-4 rounded-full ${
                      truck.status === 'active' 
                        ? 'bg-logistics-success animate-pulse' 
                        : truck.status === 'warning' || truck.status === 'maintenance'
                          ? 'bg-logistics-warning animate-pulse'
                          : 'bg-gray-400'
                    }`}
                  ></div>
                  {selectedTruckId === truck.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs">
                      {truck.name}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Mock shipment routes - only show if view is 'all' or 'shipments' */}
            {(view === 'all' || view === 'shipments') && (
              <>
                {/* Route line from Atlanta to Miami */}
                <div className="absolute left-1/4 top-1/4 w-1 h-1/2 bg-logistics-teal"></div>
                <div className="absolute left-1/4 top-3/4 w-1/2 h-1 bg-logistics-teal"></div>
                
                {/* Origin/Destination markers */}
                <div className="absolute left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="h-6 w-6 text-logistics-teal" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs">
                    Atlanta
                  </div>
                </div>
                
                <div className="absolute left-3/4 top-3/4 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="h-6 w-6 text-red-500" />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs">
                    Miami
                  </div>
                </div>
                
                {/* Active shipment marker */}
                <div className="absolute left-[45%] top-[60%] transform -translate-x-1/2 -translate-y-1/2">
                  <Truck className={`h-5 w-5 ${selectedShipmentId === 'SH-7802' ? 'text-logistics-blue scale-125' : 'text-logistics-teal'}`} />
                </div>
              </>
            )}
          </>
        )}
      </div>
      
      <div className="flex gap-4 mt-2 justify-end">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-logistics-success"></div>
          <span className="text-sm text-gray-600">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-logistics-warning"></div>
          <span className="text-sm text-gray-600">Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-400"></div>
          <span className="text-sm text-gray-600">Inactive</span>
        </div>
      </div>
    </div>
  );
}
