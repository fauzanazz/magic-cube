import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface DataProviderProps {
  children: ReactNode;
}
type StateEntry = [number, number];
export type State = StateEntry[];

interface DataContextType {
  description: any;
  stateAwal: State;
  stateAkhir: State;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [description, setDescription] = useState<any>(null);

  const [stateAwal, setStateAwal] = useState<State>([]);
  const [stateAkhir, setStateAkhir] = useState<State>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get The Description
        const response = await fetch("/external-data/data.json");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();

        setDescription(json.description);
        setStateAwal(json.firstState);
        setStateAkhir(json.lastState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ description, stateAwal, stateAkhir }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
