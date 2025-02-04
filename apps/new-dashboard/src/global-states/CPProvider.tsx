import { createContext, useState, ReactNode, useContext } from "react";

export const MyContext = createContext<{
  cpData: any;
  setCpData: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);


export const CPProvider = ({ children }: { children: ReactNode }) => {
  const [cpData, setCpData] = useState<any>(null); 
  return (
    <MyContext.Provider value={{ cpData, setCpData }}>
      {children}
    </MyContext.Provider>
  );
};


export const useCPData = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useCPData must be used within a CPProvider");
  }

  return context;
};
