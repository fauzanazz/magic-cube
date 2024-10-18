import { State } from "@/context/DataProvider";
import { CubeGridProps } from "./MagicCube";

interface Props {
  title: string;
  data : State;
  content: React.FC<CubeGridProps>;
}

const StateDisplay: React.FC<Props> = ({ title, content: Content , data}) => {
  return (
    <div>
      <h2 className="text-4xl font-bold p-10 absolute">{title}</h2>
      <Content initialCubes={data}></Content>
    </div>
  );
};

export default StateDisplay;
