import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null; // Add token field to AuthContextType
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null); // State to store token
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated using the token from cookies
    const tokenFromCookie = getCookie("token");
    if (tokenFromCookie) {
      setIsAuthenticated(true);
      setToken(tokenFromCookie); // Store token in state
    } else {
      setIsAuthenticated(false);
      setToken(null);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    // Set isAuthenticated to true and store token
    setIsAuthenticated(true);
    setToken(token);
  };

  const logout = () => {
    // Set isAuthenticated to false and clear token
    setIsAuthenticated(false);
    setToken(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
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

// Function to get cookie value by name
function getCookie(name: string) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";").map((cookie) => cookie.trim());
  for (let cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return cookie.split("=")[1];
    }
  }
  return null;
}
