import { createContext } from "react";
import type { AuthContextType } from "../interfaces/AuthInterfaces";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);