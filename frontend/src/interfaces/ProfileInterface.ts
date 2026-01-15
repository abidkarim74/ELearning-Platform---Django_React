import type { AuthUser } from "./AuthInterfaces";


export interface StudentProfile {
  id: number
  gender: string
  user: AuthUser
}