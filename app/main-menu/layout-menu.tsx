"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AlgorithmSelection from "@/components/main-menu/algorithm-input";
import ParametersInput from "@/components/main-menu/param-input";
import OptionsInput from "@/components/main-menu/option-input";
import Link from "next/link";

export enum AlgorithmEnum {
  Sideways = "Sideways Hill Climbing",
  Ascent = "Steepest Ascent Hill",
  RandomHill = "Random Hill Climbing",
  Stochatic = "Stochatic Algorithm",
  Annealing = "Simulated Annealing",
  Genetic = "Genetic Algorithm",
}

export interface MenuData {
  algorithm: AlgorithmEnum;
  iteration: number; // Params for Genetic, Sideways,
  population: number; // Params for Genetic Algorithm
  randomInput: boolean; // Slider for input option
  file: any;
}

const LayoutMenu = () => {
  const [fileContent, setFileContent] = useState<any>(null);

  const form = useForm<MenuData>({
    defaultValues: {
      algorithm: AlgorithmEnum.Ascent,
      iteration: 0,
      population: 0,
      randomInput: false,
      file: null,
    },
  });
  
  const selectedAlgorithm = form.watch("algorithm");
  const isOptionRandom = form.watch("randomInput");
  
  useEffect(() => {
    // This effect could be useful if you want to do something
    // whenever randomInput changes.
    console.log("Random input toggled:", isOptionRandom);
  }, [selectedAlgorithm]);

  // Check if Population need to be Rendered
  function isPopulation() {
    return selectedAlgorithm == AlgorithmEnum.Genetic;
  }
  // Check if Iteration need to be Rendered
  function isIteration() {
    return (
      selectedAlgorithm == AlgorithmEnum.Sideways ||
      selectedAlgorithm == AlgorithmEnum.RandomHill ||
      isPopulation()
    );
  }

  const onSubmit = (data: MenuData) => {
    console.log(data);
  };

  return (
    <div className="font-pixelify flex flex-col gap-4 min-h-screen max-md:px-12 max-lg:px-20 px-36 max-md:py-12 max-lg:py-20 py-24">
      <div className="w-full flex justify-center mb-10 text-4xl max-md:text-2xl text-center">
        <h1 className="font-bold">WELCOME TO BESOK MINGGU</h1>
      </div>
      <div>
        <h2 className="text-xl mb-4 max-md:text-lg font-bold">
          Input - Section
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <AlgorithmSelection form={form} />

            <ParametersInput
              form={form}
              isIterationRendered={isIteration()}
              isPopulationRendered={isPopulation()}
            />
            <OptionsInput
              form={form}
              handleFileUpload={setFileContent}
              isRandom={isOptionRandom}
            />

            {/* Submit Button */}
            <div className="flex justify-center w-full pt-10 ">
              <Link href="/result">
                <Button type="submit" className=" bg-moldy_green w-72 text-xl">
                  Start
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LayoutMenu;
