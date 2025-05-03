
export const getStatusBadgeClass = (status: string) => {
  switch(status) {
    case 'in-transit':
      return 'bg-logistics-teal-light/20 text-logistics-teal';
    case 'loading':
      return 'bg-logistics-orange-light/20 text-logistics-orange';
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'delayed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const calculateProgress = (status: string, currentProgress: number = 0) => {
  switch(status) {
    case 'loading':
      return 10;
    case 'in-transit':
      return 50;
    case 'delivered':
      return 100;
    case 'delayed':
      return currentProgress || 30;
    default:
      return currentProgress;
  }
};
