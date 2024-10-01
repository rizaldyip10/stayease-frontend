import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabContextProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<string>("");

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
  {children}
  </TabContext.Provider>
);
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};