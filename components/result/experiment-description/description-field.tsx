export interface DescFieldProps {
  title: string;
  value: any;
}

const DescriptionField: React.FC<DescFieldProps> = ({ title, value }) => {
  return (
    <div className="flex flex-row">
      <h2 className="text-2xl">{title.toWellFormed()} : <strong className="font-sans">{value}</strong></h2>
    </div>
  );
};

export default DescriptionField;
