"use client";
import MagicCube from "@/components/result/state/MagicCube";
import NavController from "@/components/result/nav-controller";
import StateDisplay from "@/components/result/state/state-display";

const StateAwal = () => {
  return (
    <div className="font-pixelify">
      <NavController />
      <StateDisplay title="State Awal" content={MagicCube} />
    </div>
  );
};

export default StateAwal;
