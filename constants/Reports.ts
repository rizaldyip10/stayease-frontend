import {LucideIcon} from "lucide-react";

export type OverviewSummaryTypes = {
    trxDiff: TrxDiffType;
    usersDiff: UsersDiffType;
    totalProperties: number;
    revenueDiff: RevenueDiffType;
};

export type RevenueDiffType = {
    revenueThisMonth: number;
    revenueDiffPercent: number;
};

export type TrxDiffType = {
    trxThisMonth: number;
    trxDiffPercent: number;
};

export type UsersDiffType = {
    usersThisMonth: number;
    usersDiffPercent: number;
}

export type MonthlySalesType = {
    month: number;
    totalAmount: number;
};

export type PopularRoomType = {
    room: string;
    property: string;
    roomImg: string;
    totalBooked: number;
};

export type DailySalesType = {
    date: string;
    totalPrice: number;
};

export type ReportsQueryType = {
    month: string | null;
    year: string | null;
    propertyId: number | null;
};

export type PropertySalesType = {
    revenue: number;
    tax: number;
};

export type PropertiesSelectType = {
    id: number;
    propertyName: string;
};

export type ReportStatsType = {
  icon: LucideIcon;
  label: string;
  value: number | null | undefined;
};