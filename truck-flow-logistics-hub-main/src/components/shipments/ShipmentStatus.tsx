
import { Package, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { getStatusBadgeClass } from '@/utils/shipmentHelpers';

interface ShipmentStatusProps {
  status: string;
}

export const ShipmentStatus = ({ status }: ShipmentStatusProps) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'in-transit':
        return <Package className="h-4 w-4" />;
      case 'loading':
        return <Clock className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'delayed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusBadgeClass(status)}`}>
      {getStatusIcon(status)}
      <span>
        {status === 'in-transit' 
          ? 'In Transit' 
          : status === 'loading' 
            ? 'Loading' 
            : status === 'delivered'
              ? 'Delivered'
              : 'Delayed'}
      </span>
    </div>
  );
};
