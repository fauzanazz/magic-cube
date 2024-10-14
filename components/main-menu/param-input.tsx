import { MenuData } from "@/app/main-menu/layout-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<MenuData>;
  isIterationRendered: boolean;
  isPopulationRendered: boolean;
}

const ParametersInput = ({
  form,
  isIterationRendered,
  isPopulationRendered,
}: Props) => {
  const isRendered = isIterationRendered || isPopulationRendered;
  return (
    <>
      {/* If is Rendered is false, Nothing rendered */}
      {isRendered && (
        <div className="border border-moldy_green p-8 gap-8 flex items-center rounded-md shadow-md justify-start">
          <h3 className="w-44 text-lg font-semibold">Parameters</h3>
          <div className="flex flex-col font-medium text-lg  gap-y-4">
            {/* Max Iteration */}
            {isIterationRendered && (
              <FormField
                control={form.control}
                name="iteration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-56 font-semibold text-primary_green">
                      Max Iteration
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder="Enter Max Iteration"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {/* Population */}

            {isPopulationRendered && (
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
                        min={0}
                        placeholder="Enter population size"
                      />
                    </FormControl>
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
