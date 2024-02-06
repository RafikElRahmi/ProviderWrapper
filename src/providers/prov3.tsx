import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
} from "react";

export type DataProviderType = FC<{
  fetchData: () => Promise<{ data: string }>;
  children: React.ReactNode;
}>;

export interface DataContextType {
  data: string | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType>({
  data: "this our data",
  loading: true,
  error: null,
});

const DataProvider: DataProviderType = ({ children, fetchData }) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchData();
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  const value: DataContextType = { data, loading, error };

  return <DataContext.Provider value={value}> {children} </DataContext.Provider>

};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  return context;
};

export default DataProvider;
