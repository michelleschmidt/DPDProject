import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../../Axios"; // Adjust the path as needed
import { User } from "../Types";

interface AuthContextType {
  isAuthenticated: boolean;
  userData: User | null;
  login: (data: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/check-auth");
      setIsAuthenticated(true);
      setUserData(response.data.user);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
      localStorage.removeItem("userData");
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (data: User) => {
    console.log("Login data: ", data);
    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    setUserData(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
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
