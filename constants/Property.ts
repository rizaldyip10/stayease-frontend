export type PropertyType = {
    id: number;
    tenant: string;
    category: string;
    propertyName: string;
    description: string;
    picture: string;
    address: string;
    city: string;
    country: string;
    rooms: [{ roomId: number, roomName: string }];
};

export type RoomType = {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    propertySummary: { propertyId: number; propertyName: string; }
}