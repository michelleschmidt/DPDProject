import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../../Axios"; // Adjust the path as needed
import { UserData } from "../Types";

interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (data: UserData) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/check-auth");
      setIsAuthenticated(true);
      setUserData(response.data.user);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (data: UserData) => {
    setUserData(data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
