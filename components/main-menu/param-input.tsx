import { MenuData } from "@/app/main-menu/layout-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

export interface ParamsStruct{
  label : string,
  value : boolean
}

interface Props {
  form: UseFormReturn<MenuData>;
  iterationRendered: ParamsStruct;
  populationRendered: boolean;

}

const ParametersInput = ({
  form,
  iterationRendered,
  populationRendered,
}: Props) => {
  const isRendered = iterationRendered.value || populationRendered;
  return (
    <>
      {/* If is Rendered is false, Nothing rendered */}
      {isRendered && (
        <div className="border border-moldy_green p-8 gap-8 flex items-center rounded-md shadow-md justify-start">
          <h3 className="w-44 text-lg font-semibold">Parameters</h3>
          <div className="flex flex-col font-medium text-lg  gap-y-4">
            {/* Max Iteration */}
            {iterationRendered.value && (
              <FormField
                control={form.control}
                name="iteration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-56 font-semibold text-primary_green">
                      {iterationRendered.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        placeholder="Enter Max Iteration"
                        className="w-full"
                        {...form.register("iteration", {
                          valueAsNumber : true,
                        })}
                      />
                    </FormControl>
                    <FormMessage>
          
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
            {/* Population */}

            {populationRendered && (
              <FormField
                control={form.control}
                name="population"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-56 font-semibold text-primary_green">
                      Population
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        placeholder="Enter population size"
                        {...form.register("population", {
                          valueAsNumber : true,
                        })}
                      />
                    </FormControl>
                    <FormMessage>
                      
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ParametersInput;
