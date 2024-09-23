"use client";
import React from "react";
import { RatesManagementStale } from "@/app/dashboard/rates/settings/_components/RatesManagementStale";
import RatesTableSummary from "@/app/dashboard/rates/_components/RatesTableSummary";

const RatesPage: React.FC = () => {
  return (
    <div>
      <RatesTableSummary />
    </div>
  );
};

export default RatesPage;
