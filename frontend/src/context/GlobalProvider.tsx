import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { fetchProtected } from "../api";
interface GlobalContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface GlobalProviderProps {
  children: ReactNode; 
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};


export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children} : GlobalProviderProps) => {
    const [user, setUser] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchProtected();
          setUser(response.message);
          setShow(true);
        } catch (error) {
          console.error("Failed to fetch protected data", error);
        }
        finally{
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);
    return (
      <GlobalContext.Provider value={{ 
        user,
        setUser,
        show,
        setShow,
        isLoading,
        setIsLoading
        }}>
        {children}
      </GlobalContext.Provider>
    );
  };