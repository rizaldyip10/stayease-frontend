"use client";
import React from "react";
import { RatesManagement } from "@/app/dashboard/rates/settings/_components/RatesManagement";
import RatesTableSummary from "@/app/dashboard/rates/_components/RatesTableSummary";

const RatesPage: React.FC = () => {
  return (
    <div>
      <RatesTableSummary />
    </div>
  );
};

export default RatesPage;
