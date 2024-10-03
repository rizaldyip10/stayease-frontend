export interface TenantRoomAvailability {
  id: number;
  name: string;
  propertySummary: {
    propertyId: number;
    propertyName: string;
    imageUrl: string;
  };
  roomAvailability: AvailabilityResponse[];
}

export interface AvailabilityRequest {
  startDate: Date;
  endDate: Date;
}

export interface AvailabilityResponse {
  id: number;
  startDate: Date;
  endDate: Date;
  isAvailable: boolean;
  isManual: boolean;
  roomId: number;
}
