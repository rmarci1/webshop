import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { fetchProtected } from "../api";
interface Item{
  id: number;
  name?: string;
  title?: string;
  category?: string;
  author?: string;
  genre?: string;
  size?: string;
  color?: string;
  material?: string;
  weight_kg?: number;
  price: number;
  stock: number;
  publication_year?: number;
}

interface GlobalContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  cart: Item[];
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
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
    const [cart, setCart] = useState<Item[]>(() => {
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
      }
      return [];
    });
  
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchProtected();
          setUser(response.message);
          setShow(true);
          console.log("fetch");
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
        setIsLoading,
        cart,
        setCart
        }}>
        {children}
      </GlobalContext.Provider>
    );
  };