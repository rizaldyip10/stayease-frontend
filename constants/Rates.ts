export interface RateResponseType {
  rateId: number;
  startDate: Date;
  endDate: Date;
  adjustmentRate: number;
  adjustmentType: string;
  validFrom: Date;
  reason: string;
  propertySummary: {
    propertyId: number;
    propertyName: string;
  };
}

export interface RateRequestType {
  startDate: Date;
  endDate: Date;
  adjustmentRate: number;
  adjustmentType: string;
  reason: string;
}

export interface AutoRateRequestType {
  useAutoRate: boolean;
  holidayRate: number;
  holidayRateType: string;
  weekendRate: number;
  weekendRateType: string;
}

export interface AutoRateResponseType {
  settingId: number;
  useAutoRate: boolean;
  holidayRate: number;
  holidayRateType: string;
  weekendRate: number;
  weekendRateType: string;
  validFrom: Date;
  PropertySummary: {
    propertyId: number;
    propertyName: string;
    imageUrl: string;
  };
}
