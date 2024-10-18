"use client";
import MagicCube from "@/components/result/state/MagicCube";
import NavController from "@/components/result/nav-controller";
import StateDisplay from "@/components/result/state/state-display";

const StateAkhir = () => {
  return (
    <div className="font-pixelify">
      <NavController />
      <StateDisplay title="State Akhir" content={MagicCube} />
    </div>
  );
};

export default StateAkhir;
