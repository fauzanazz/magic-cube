interface Props {
  title: string;
  content: React.FC<{}>;
}

const StateDisplay: React.FC<Props> = ({ title, content: Content }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold p-10 absolute" >{title}</h2>
      <Content />
    </div>
  );
};

export default StateDisplay;
