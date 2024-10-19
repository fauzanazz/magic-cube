"use client";
import NavController from "@/components/result/nav-controller";
import DescriptionDisplay, {
} from "@/components/result/experiment-description/description-display";
import { AlgorithmEnum } from "@/app/main-menu/layout-menu";
import { useData } from "@/context/DataProvider";


const ExperienceDescription = () => {
  
  const data = useData();
  const selectedAlgorithm = data?.algorithm ?? "";
  const mappedData = data?.description 
    ? Object.entries(data.description).map(([key, value]) => ({
        title: key, // Use the key as the title
        value: value?.toString() || "", // Convert the value to a string or provide a fallback
      }))
    : [];

  return (
    <div className="font-pixelify">
      <NavController />
      <h1 className="text-4xl p-10 font-bold">Deskripsi</h1>
      <DescriptionDisplay
        algorithm={selectedAlgorithm}
        data={mappedData}
      ></DescriptionDisplay>
    </div>
  );
};

export default ExperienceDescription;
