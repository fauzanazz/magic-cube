"use client"
import { DataProvider } from "../../context/DataProvider";

const ResultsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <main>{children}</main>
    </DataProvider>
  );
};

export default ResultsLayout;
