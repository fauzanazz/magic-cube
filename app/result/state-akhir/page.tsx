"use client";
import MagicCube from "@/components/result/state/MagicCube";
import NavController from "@/components/result/nav-controller";
import StateDisplay from "@/components/result/state/state-display";
import { State, useData } from "@/context/DataProvider";

const StateAkhir = () => {
  const data = useData();
  const stateAkhir: State  = data?.stateAkhir ?? [];
  return (
    <div className="font-pixelify">
      <NavController />
      <StateDisplay data={stateAkhir} title="State Akhir" content={MagicCube} />
    </div>
  );
};

export default StateAkhir;
