"use client";
import MagicCube from "@/components/result/state/MagicCube";
import NavController from "@/components/result/nav-controller";
import StateDisplay from "@/components/result/state/state-display";
import { State, useData } from "@/context/DataProvider";

const StateAwal = () => {
  const data = useData();
  const stateAwal: State  = data?.stateAwal ?? [];
  
  return (
    <div className="font-pixelify">
      <NavController />
      <StateDisplay title="State Awal" content={MagicCube} data={stateAwal} />
    </div>
  );
};

export default StateAwal;
