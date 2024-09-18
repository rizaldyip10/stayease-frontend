export type PropertyType = {
  id: number;
  tenant: string;
  category: string;
  propertyName: string;
  description: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  rooms: { roomId: number; roomName: string; roomBasePrice: number }[];
};

export type PropertyAndRoomType = {
  id: number;
  tenant: string;
  category: string;
  propertyName: string;
  description: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  rooms?: RoomType[] | null;
};

export type RoomType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  capacity: number;
  propertySummary: { propertyId: number; propertyName: string };
};

export type CategoryType = {
  id: number;
  name: string;
};

export type RoomAvailabilityType = {
  id: number;
  room: RoomType;
  startDate: string;
  endDate: string;
  isAvailable: boolean;
};
