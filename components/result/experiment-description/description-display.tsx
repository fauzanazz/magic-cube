
import DescriptionField, { DescFieldProps } from "./description-field";

export interface DescriptionDescProps {
  algorithm: string;
  data: DescFieldProps[];
}

const DescriptionDisplay: React.FC<DescriptionDescProps> = ({
  algorithm,
  data,
}) => {
  return (
    <div className="border-primary_red border-2 rounded-lg p-6 w-2/3 ml-10 flex flex-col gap-4">
      <h1 className="text-3xl">
        Algoritma : <strong className="font-sans">{algorithm}</strong>
      </h1>
      <div>
        {/* Map all the Description Content */}
        {data.map((item, index) => (
          <DescriptionField
            key={index}
            title={item.title}
            value={item.value}
          ></DescriptionField>
        ))}
      </div>
    </div>
  );
};

export default DescriptionDisplay;
