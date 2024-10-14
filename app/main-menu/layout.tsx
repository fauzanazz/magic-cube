"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

enum AlgorithmEnum {
  Sideways = "Sideways Hill Climbing",
  Ascent = "Steepest Ascent Hill",
  RandomHill = "Random Hill Climbing",
  Stochatic = "Stochatic Algorithm",
  Annealing = "Simulated Annealing",
  Genetic = "Genetic Algorithm",
}

interface MenuData {
  algorithm: AlgorithmEnum;
  iteration: number;
  population: number;
  randomInput: boolean;
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

  const onSubmit = (data: MenuData) => {
    console.log(data);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          try {
            const json = JSON.parse(result as string);
            setFileContent(json);
            form.setValue("file", json); // Save to form data
          } catch (error) {
            console.error("Invalid JSON file");
          }
        }
      };
      reader.readAsText(file);
    }
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
            {/* Algorithm Selection */}
            <FormField
              control={form.control}
              name="algorithm"
              render={({ field }) => (
                <FormItem
                  className="border border-moldy_green p-8 gap-12 flex items-center
                 rounded-md shadow-md"
                >
                  <FormLabel className="text-lg w-44 font-semibold">
                    Algorithm To Use
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="text-md w-64 bg-primary_red text-white">
                      <SelectValue placeholder="Select an Algorithm"></SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={AlgorithmEnum.Ascent}>
                        {AlgorithmEnum.Ascent}
                      </SelectItem>
                      <SelectItem value={AlgorithmEnum.Sideways}>
                        {AlgorithmEnum.Sideways}
                      </SelectItem>
                      <SelectItem value={AlgorithmEnum.RandomHill}>
                        {AlgorithmEnum.RandomHill}
                      </SelectItem>
                      <SelectItem value={AlgorithmEnum.Stochatic}>
                        {AlgorithmEnum.Stochatic}
                      </SelectItem>
                      <SelectItem value={AlgorithmEnum.Annealing}>
                        {AlgorithmEnum.Annealing}
                      </SelectItem>
                      <SelectItem value={AlgorithmEnum.Genetic}>
                        {AlgorithmEnum.Genetic}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Max Iteration */}
            <div
              className="border border-moldy_green p-8 gap-32 flex items-center
                 rounded-md shadow-md"
            >
              <h3 className="text-lg font-semibold">Parameters</h3>
              <div className="flex flex-col font-medium text-lg w-full gap-y-4">
                <FormField
                  control={form.control}
                  name="iteration"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="w-56 font-semibold text-primary_green">
                        Max Iteration
                      </FormLabel>
                      <FormControl className="font-mono ">
                        <Input
                          type="number"
                          min={0}
                          placeholder="Enter Max Iteration"
                          className="w-full"
                        ></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>

                {/* Population */}
                <FormField
                  control={form.control}
                  name="population"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="w-56  font-semibold text-primary_green">
                        Population
                      </FormLabel>
                      <FormControl className="font-mono">
                        <Input
                          type="number"
                          min={0}
                          placeholder="Enter population size"
                        ></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>

            {/* Option */}
            <div
              className="border border-moldy_green p-8 gap-32 flex items-center
                 rounded-md shadow-md"
            >
              <h3 className="text-lg font-semibold">Parameters</h3>
              <div className="flex flex-col font-medium text-lg gap-y-4">
                {/* Switch Button */}
                <FormField
                  control={form.control}
                  name="iteration"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="w-56 font-semibold text-primary_green">
                        Max Iteration
                      </FormLabel>
                      <Label>Random</Label>
                      <Switch></Switch>
                      <Label>File</Label>
                    </FormItem>
                  )}
                ></FormField>

                {/* File Button */}
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="w-56  font-semibold text-primary_green">
                        Population
                      </FormLabel>
                      <FormControl className="font-pixelify w-full">
                        <Input
                          type="file"
                          accept=".json"
                          onChange={handleFileUpload}
                          placeholder="Input File"
                          className="border-primary_green text-primary_green placeholder:text-primary_green"
                        ></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>

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
