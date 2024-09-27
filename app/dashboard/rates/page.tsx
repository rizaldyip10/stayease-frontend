"use client";
import React from "react";
import RatesTableSummary from "@/app/dashboard/rates/_components/RatesTableSummary";
import { TabProvider } from "@/context/TabContext";

const RatesPage: React.FC = () => {
  return (
    <div>
      <RatesTableSummary />
    </div>
  );
};

export default RatesPage;
