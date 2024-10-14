import { AlgorithmEnum, MenuData } from "@/app/main-menu/layout-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<MenuData>;
}

const 
AlgorithmSelection = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="algorithm"
      render={({ field }) => (
        <FormItem className="border border-moldy_green p-8 gap-8 flex items-center rounded-md shadow-md">
          <FormLabel className="text-lg w-44 font-semibold">
            Algorithm To Use
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="text-md w-64 bg-primary_red text-white">
              <SelectValue placeholder="Select an Algorithm" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(AlgorithmEnum).map((algorithm) => (
                <SelectItem key={algorithm} value={algorithm}>
                  {algorithm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AlgorithmSelection;
