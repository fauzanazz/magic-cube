import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import { MenuData } from "@/app/main-menu/layout-menu";

interface Props {
  form: UseFormReturn<MenuData>;
  isRandom: boolean;
  handleFileUpload: (fileContent: any) => void;
}

const OptionsInput = ({ form, handleFileUpload, isRandom }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          try {
            const json = JSON.parse(result as string);
            handleFileUpload(json);
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
    <div className="border border-moldy_green p-8 gap-8 flex items-center rounded-md shadow-md">
      <h3 className="text-lg font-semibold w-44">Options</h3>
      <div className="flex flex-col font-medium text-lg gap-y-4">
        {/* Switch Input */}
        <FormField
          control={form.control}
          name="isFile"
          render={({ field }) => (
            <FormItem className="flex gap-3 text-sm items-center font-semibold">
              <h5
                className={`mt-2 ${
                  isRandom ? `opacity-50` : `opacity-100`
                } text-primary_red`}
              >
                Random
              </h5>
              <Switch onCheckedChange={field.onChange}></Switch>
              <h5
                className={`${
                  isRandom ? `opacity-100` : `opacity-50`
                } text-primary_green`}
              >
                File
              </h5>
            </FormItem>
          )}
        />

        {/* File Input */}
        {isRandom && (
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem className="w-full">
                <FormLabel className="w-56 font-semibold text-primary_green">
                  Upload JSON File
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    placeholder="Input File"
                    className="border-primary_green text-primary_green placeholder:text-primary_green hover:cursor-pointer"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default OptionsInput;
