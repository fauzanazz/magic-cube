export interface DescFieldProps {
  title: string;
  value: string;
}

const DescriptionField: React.FC<DescFieldProps> = ({ title, value }) => {
  return (
    <div className="flex flex-row">
      <h2 className="text-xl">{title} : </h2>
      <h3 className="text-lg">{value}</h3>
    </div>
  );
};

export default DescriptionField;