import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const [token, setToken] = useState("");

  const fetchToken = async () => {
    setToken(await getToken());
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const value = {
    loading,
    setLoading,
    axios,
    getToken,
    token,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
