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
  useAutoRates: boolean;
  holidayAdjustmentRate: number | null;
  holidayAdjustmentType: string | null;
  longWeekendAdjustmentRate: number | null;
  longWeekendAdjustmentType: string | null;
}

export interface AutoRateResponseType {
  settingId: number;
  useAutoRates: boolean;
  holidayAdjustmentRate: number;
  holidayAdjustmentType: string;
  longWeekendAdjustmentRate: number;
  longWeekendAdjustmentType: string;
  validFrom: Date;
  PropertySummary: {
    propertyId: number;
    propertyName: string;
    imageUrl: string;
  };
}
