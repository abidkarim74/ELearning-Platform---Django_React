import {
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useRef,
} from "react";

import { AuthContext } from "./AuthContext";
import { setAuthorizationHeaderToken } from "../requests/setAuthToken";

import Cookies from "js-cookie";
import { type AuthUser } from "../interfaces/AuthInterfaces";
import { getRequest } from "../requests/requests";
import api from "../requests/axiosInstance";
import  type { AuthContextType } from "../interfaces/AuthInterfaces";


export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [mainLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const refreshInProgress = useRef(false); 
  const initialized = useRef(false); 


  const refreshAccessToken = async (): Promise<string | null> => {
    if (refreshInProgress.current) {
      return null;
    }
    refreshInProgress.current = true;
    
    try {
      const response = await api.post("/auth/refresh-token/", {});

      const token = response.data.access_token;

      if (token) {
        setAccessToken(token);

        setAuthorizationHeaderToken(token);

        return token;

      } else {
        return null;
      }

    } catch (err:any) {
      return null;

    } finally {
      refreshInProgress.current = false;
    }
  };

  const fetchAuthenticatedUser = async (): Promise<AuthUser | null> => {
    try {
      const response = await getRequest("/auth/auth-user/");
      return response.data;

    } catch (error:any) {
      return null;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout/");

    } catch (error) {

    } finally {
      setAccessToken(null);
      setUser(null);

      delete api.defaults.headers.common["Authorization"];
      
      Cookies.remove("refreshToken");
    }
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/auth/refresh-token/") &&
          !originalRequest.url.includes("/auth/logout/")
        ) {
          originalRequest._retry = true;

          const newToken = await refreshAccessToken();

          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            return api(originalRequest);

          } else {
            await logout();
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    setAuthorizationHeaderToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (initialized.current) return;
    
    const initAuth = async () => {
      initialized.current = true;
      
      try {
        const token = await refreshAccessToken();

        if (token) {
          const userData = await fetchAuthenticatedUser();
          setUser(userData);

        } else {

          // await logout();
        }
      } catch (error) {
        await logout();
        
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const contextValue: AuthContextType = {
    mainLoading,
    user,
    setUser,
    setLoading,
    accessToken,
    setAccessToken,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}