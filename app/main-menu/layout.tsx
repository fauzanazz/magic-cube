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
}

const LayoutMenu = () => {
  const form = useForm<MenuData>({
    defaultValues: {
      algorithm: AlgorithmEnum.Ascent,
      iteration: 0,
      population: 0,
      randomInput: false,
    },
  });

  const onSubmit = (data: MenuData) => {
    console.log(data);
  };

  return (
    <div className="font-pixelify flex flex-col gap-4 p-12 min-h-screen">
      <div className= "w-full flex justify-center">
        <h1 className="text-4xl font-bold">TUBES AI BESOK MINGGU</h1>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Input - Section</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Algorithm Selection */}
            <FormField
              control={form.control}
              name="algorithm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Algorithm To Use</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an Algorithm"></SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={AlgorithmEnum.Ascent}></SelectItem>
                      <SelectItem value={AlgorithmEnum.Sideways}></SelectItem>
                      <SelectItem value={AlgorithmEnum.RandomHill}></SelectItem>
                      <SelectItem value={AlgorithmEnum.Stochatic}></SelectItem>
                      <SelectItem value={AlgorithmEnum.Stochatic}></SelectItem>
                      <SelectItem value={AlgorithmEnum.Genetic}></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Max Iteration */}
            <FormField
              control={form.control}
              name="iteration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Iteration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Max Iteration"
                      {...field}
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
                <FormItem>
                  <FormLabel>Population</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter population size"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            ></Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LayoutMenu;
