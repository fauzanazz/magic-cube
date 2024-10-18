"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AlgorithmSelection from "@/components/main-menu/algorithm-input";
import ParametersInput from "@/components/main-menu/param-input";
import OptionsInput from "@/components/main-menu/option-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
  isFile: boolean; // Slider for input option
  file: any;
}

// Create the validation schema
export const menuSchema = z
  .object({
    algorithm: z.nativeEnum(AlgorithmEnum),

    // Iteration: validated conditionally
    iteration: z.number().min(0).optional(),

    // Population: validated conditionally
    population: z.number().min(0).optional(),

    // Random input toggle
    isFile: z.boolean().optional(),

    // File: required when randomInput is false
    file: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    // Check if algorithm requires iteration
    const requiresIteration = [
      AlgorithmEnum.Sideways,
      AlgorithmEnum.RandomHill,
      AlgorithmEnum.Genetic,
    ].includes(data.algorithm);

    // If iteration is required, validate its value
    if (
      requiresIteration &&
      (data.iteration === undefined || data.iteration <= 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["iteration"],
        message:
          "Iteration is required and must be greater than 0 for the selected algorithm.",
      });
    }

    // Check if algorithm requires population (Genetic only)
    if (
      data.algorithm === AlgorithmEnum.Genetic &&
      (data.population === undefined || data.population <= 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["population"],
        message:
          "Population is required and must be greater than 0 for Genetic Algorithm.",
      });
    }

    // If randomInput is false, file must be provided
    if (data.isFile && !data.file) {
      ctx.addIssue({
        code: "custom",
        path: ["file"],
        message: "File is required when random input is disabled.",
      });
    }
  });

const LayoutMenu = () => {
  const navigate = useRouter();
  const [fileContent, setFileContent] = useState<any>(null);

  const form = useForm<MenuData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      algorithm: AlgorithmEnum.Ascent,
      iteration: 0,
      population: 0,
      isFile: false,
      file: null,
    },
  });

  const selectedAlgorithm = form.watch("algorithm");
  const isOptionRandom = form.watch("isFile");

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
    console.log("TEST DATa : ", data);
    // Execute Data Here
    navigate.push("/result");
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
          <form
            action="POST"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 "
          >
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
              <Button type="submit" className=" bg-moldy_green w-72 text-xl">
                Start
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LayoutMenu;
