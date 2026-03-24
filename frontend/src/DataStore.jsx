import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [llmData, setLLMData] = useState(null);

  return (
    <DataContext.Provider value={{ llmData, setLLMData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataStore = () => useContext(DataContext);