"use client";
import MagicCube from "@/components/result/state/MagicCube";
import NavController from "@/components/result/nav-controller";
import StateDisplay from "@/components/result/state/state-display";
import DescriptionDisplay, {
  DescriptionDescProps,
} from "@/components/result/experiment-description/description-display";
import { AlgorithmEnum } from "@/app/main-menu/layout-menu";
import { DescFieldProps } from "@/components/result/experiment-description/description-field";

// Updated AlgorithmData structure
const AlgorithmData: { [key in AlgorithmEnum]: DescFieldProps[] } = {
  [AlgorithmEnum.Ascent]: [
    {
      title: "Objective Function",
      value: "200",
    },
    {
      title: "Durasi",
      value: "300s",
    },
  ],
  [AlgorithmEnum.Sideways]: [
    {
      title: "Objective Function",
      value: "300",
    },
    {
      title: "Durasi",
      value: "400",
    },
    {
      title: "Banyak Iterasi",
      value: "2",
    },
  ],
  [AlgorithmEnum.RandomHill]: [
    {
      title: "Objective Function",
      value: "200",
    },
    {
      title: "Durasi",
      value: "300s",
    },
    {
      title: "Banyak Restart",
      value: "20",
    },
    {
      title: "Banyak Iterasi per Restart",
      value: "5",
    },
  ],
  [AlgorithmEnum.Stochatic]: [
    {
      title: "Objective Function",
      value: "200",
    },
    {
      title: "Durasi",
      value: "300s",
    },
    {
      title: "Banyak Iterasi",
      value: "40",
    },
  ],
  [AlgorithmEnum.Annealing]: [
    {
      title: "Objective Function",
      value: "200",
    },
    {
      title: "Durasi",
      value: "300s",
    },
    {
      title: "Plot e^(delta E/T)",
      value: "GA TAU INI GMN BOS",
    },
    {
      title: "Frekuensi Stuck",
      value: "0.3",
    },
  ],
  [AlgorithmEnum.Genetic]: [
    {
      title: "Objective Function",
      value: "200",
    },
    {
      title: "Durasi",
      value: "300s",
    },
  ],
};

const ExperienceDescription = () => {
  // Dummy Used Algorithm
  const selectedAlgorithm = AlgorithmEnum.Annealing;
  const data_algorihtm = AlgorithmData[selectedAlgorithm];
  return (
    <div className="font-pixelify">
      <NavController />
      <h1 className="text-4xl p-10 font-bold">Deskripsi</h1>
      <DescriptionDisplay
        algorithm={selectedAlgorithm}
        data={data_algorihtm}
      ></DescriptionDisplay>
    </div>
  );
};

export default ExperienceDescription;
