
import { useState } from 'react';
import { MapPin, User, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { ShipmentStatus } from './ShipmentStatus';
import { ShipmentProgress } from './ShipmentProgress';
import { calculateProgress } from '@/utils/shipmentHelpers';
import type { ShipmentTrackerProps } from '@/types/shipment';

export function ShipmentTracker({ shipments, onShipmentSelect, onStatusUpdate, onRemoveShipment }: ShipmentTrackerProps) {
  const [expandedShipment, setExpandedShipment] = useState<string | null>(null);

  const toggleShipmentDetails = (shipmentId: string) => {
    if (expandedShipment === shipmentId) {
      setExpandedShipment(null);
    } else {
      setExpandedShipment(shipmentId);
      onShipmentSelect(shipmentId);
    }
  };

  const updateStatus = (shipmentId: string, newStatus: string) => {
    const currentShipment = shipments.find(s => s.id === shipmentId);
    const newProgress = calculateProgress(newStatus, currentShipment?.progress);
    onStatusUpdate(shipmentId, newStatus, newProgress);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-logistics-blue">Active Shipments</h2>
        <button 
          className="text-sm text-logistics-teal hover:underline"
          onClick={() => toast.info("View all shipments clicked")}
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {shipments.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No shipments found. Create a new shipment to get started.
          </div>
        ) : (
          shipments.map((shipment) => (
            <div key={shipment.id} className="border rounded-lg p-4">
              <div 
                className="flex justify-between items-center mb-2 cursor-pointer"
                onClick={() => toggleShipmentDetails(shipment.id)}
              >
                <div className="font-semibold text-logistics-blue">{shipment.id}</div>
                <ShipmentStatus status={shipment.status} />
              </div>
              
              <div className="mb-3">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    <span className="font-medium">{shipment.origin}</span> to <span className="font-medium">{shipment.destination}</span>
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  <span>{shipment.driver}</span>
                </div>
              </div>
              
              <ShipmentProgress 
                departureTime={shipment.departureTime}
                arrivalTime={shipment.arrivalTime}
                progress={shipment.progress}
                status={shipment.status}
              />

              {expandedShipment === shipment.id && (
                <div className="mt-4 pt-3 border-t">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="text-sm font-medium">{shipment.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cargo</p>
                      <p className="text-sm font-medium">{shipment.cargo} ({shipment.weight})</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => onShipmentSelect(shipment.id)}
                    >
                      Track on Map
                    </button>
                    <button 
                      className="bg-logistics-orange text-white px-2 py-1 rounded text-xs"
                      onClick={() => updateStatus(shipment.id, 'loading')}
                    >
                      Mark Loading
                    </button>
                    <button 
                      className="bg-logistics-teal text-white px-2 py-1 rounded text-xs"
                      onClick={() => updateStatus(shipment.id, 'in-transit')}
                    >
                      Mark In Transit
                    </button>
                    <button 
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => updateStatus(shipment.id, 'delivered')}
                    >
                      Mark Delivered
                    </button>
                    <button 
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => updateStatus(shipment.id, 'delayed')}
                    >
                      Report Delay
                    </button>
                    {onRemoveShipment && (
                      <button 
                        className="bg-gray-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onRemoveShipment) onRemoveShipment(shipment.id);
                        }}
                      >
                        <Trash className="h-3 w-3" /> Remove
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
