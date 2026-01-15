export interface AuthUser {
  id: number
  first_name: string,
  last_name: string,
  profile_pic: string | null
  username: string
}


export interface AuthContextType  {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  mainLoading: boolean;
  user: AuthUser | null;
  setUser: (value: AuthUser | null) => void;
  setLoading: (value: boolean) => void;
  logout: () => void;
};
