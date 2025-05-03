
// Mock truck data
export const trucks = [
  { id: 1, name: "Truck-001", lat: 33.749, lng: -84.388, status: 'active', driver: "John Smith", fuelLevel: 78, mileage: 12450 },
  { id: 2, name: "Truck-002", lat: 34.052, lng: -84.998, status: 'active', driver: "Maria Rodriguez", fuelLevel: 45, mileage: 28320 },
  { id: 3, name: "Truck-003", lat: 33.952, lng: -83.358, status: 'warning', driver: "David Johnson", fuelLevel: 33, mileage: 15400 },
  { id: 4, name: "Truck-004", lat: 33.849, lng: -84.628, status: 'maintenance', driver: "Sarah Williams", fuelLevel: 90, mileage: 5230 },
  { id: 5, name: "Truck-005", lat: 34.152, lng: -83.798, status: 'inactive', driver: "Michael Brown", fuelLevel: 12, mileage: 32150 },
];

// Mock shipment data
export const shipments = [
  {
    id: "SH-7802",
    origin: "Atlanta, GA",
    destination: "Miami, FL",
    driver: "John Smith",
    departureTime: "08:00 AM",
    arrivalTime: "04:30 PM",
    status: "in-transit",
    progress: 65,
    truckId: 1,
    customer: "Global Retailers Inc.",
    cargo: "Electronics",
    weight: "2.5 tons"
  },
  {
    id: "SH-7803",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    driver: "Maria Rodriguez",
    departureTime: "09:15 AM",
    arrivalTime: "02:00 PM",
    status: "loading",
    progress: 15,
    truckId: 2,
    customer: "Texas Distribution Co.",
    cargo: "Furniture",
    weight: "3 tons"
  },
  {
    id: "SH-7804",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    driver: "David Johnson",
    departureTime: "07:30 AM",
    arrivalTime: "01:45 PM",
    status: "delivered",
    progress: 100,
    truckId: 3,
    customer: "Midwest Suppliers",
    cargo: "Auto Parts",
    weight: "4.2 tons"
  },
  {
    id: "SH-7805",
    origin: "New York, NY",
    destination: "Boston, MA",
    driver: "Sarah Williams",
    departureTime: "06:45 AM",
    arrivalTime: "12:30 PM",
    status: "delayed",
    progress: 40,
    truckId: 4,
    customer: "Eastern Medical Supply",
    cargo: "Medical Equipment",
    weight: "1.8 tons"
  },
];

// Mock delivery data for charts
export const deliveryData = [
  { name: 'Mon', onTime: 24, delayed: 3 },
  { name: 'Tue', onTime: 32, delayed: 5 },
  { name: 'Wed', onTime: 28, delayed: 2 },
  { name: 'Thu', onTime: 30, delayed: 4 },
  { name: 'Fri', onTime: 36, delayed: 6 },
  { name: 'Sat', onTime: 22, delayed: 1 },
  { name: 'Sun', onTime: 18, delayed: 0 },
];

// Mock fuel data for charts
export const fuelData = [
  { name: 'Week 1', usage: 2400 },
  { name: 'Week 2', usage: 2210 },
  { name: 'Week 3', usage: 2290 },
  { name: 'Week 4', usage: 2000 },
];

// Fleet status summary
export const fleetStats = [
  { label: 'Total Trucks', value: 48, status: 'normal' },
  { label: 'Active', value: 32, status: 'success' },
  { label: 'Maintenance', value: 8, status: 'warning' },
  { label: 'Issues', value: 3, status: 'danger' },
];
