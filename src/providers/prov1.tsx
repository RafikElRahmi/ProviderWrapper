import  { createContext, useState, useEffect, useContext } from "react";
import { reactChildren } from "./provWrap";

type loginData = {
    username: string;
    password:string
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: string; 
  onLogin: (userData: loginData) => Promise<void>; 
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: "",
  onLogin: async () => {
    throw new Error("onLogin function not implemented");
  },
  onLogout: () => {},
});

const AuthProvider :reactChildren= ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { isAuthenticated, user } = JSON.parse(
        storedUserData
      ) as AuthContextType;
      setIsAuthenticated(isAuthenticated);
      setUser(user);
    }
  }, []);

  const onLogin = async (userData: loginData): Promise<void> => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const { isAuthenticated, user } = await response.json();
    setIsAuthenticated(isAuthenticated);
    setUser(user);
    localStorage.setItem("userData", JSON.stringify({ isAuthenticated, user }));
  };

  const onLogout = (): void => {
    setIsAuthenticated(false);
    setUser("");
    localStorage.removeItem("userData");
  };

  const value: AuthContextType = { isAuthenticated, user, onLogin, onLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthProvider;
