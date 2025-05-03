
import { Clock } from 'lucide-react';

interface ShipmentProgressProps {
  departureTime: string;
  arrivalTime: string;
  progress: number;
  status: string;
}

export const ShipmentProgress = ({ departureTime, arrivalTime, progress, status }: ShipmentProgressProps) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-1 items-center justify-between">
        <div className="text-xs text-gray-500 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {departureTime}
        </div>
        <div className="text-xs text-gray-500 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {arrivalTime}
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
        <div 
          style={{ width: `${progress}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
            status === 'in-transit' 
              ? 'bg-logistics-teal' 
              : status === 'loading' 
                ? 'bg-logistics-orange' 
                : status === 'delivered'
                  ? 'bg-green-500'
                  : 'bg-red-500'
          }`}
        />
      </div>
    </div>
  );
};
