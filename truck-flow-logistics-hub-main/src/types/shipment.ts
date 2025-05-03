
export interface ShipmentData {
  id: string;
  origin: string;
  destination: string;
  driver: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  progress: number;
  truckId: number;
  customer: string;
  cargo: string;
  weight: string;
  driverId?: number; // Add driverId to track which driver is assigned
}

export interface ShipmentTrackerProps {
  shipments: ShipmentData[];
  onShipmentSelect: (id: string) => void;
  onStatusUpdate: (id: string, status: string, progress: number) => void;
  onRemoveShipment?: (id: string) => void;
}
