import { useEffect } from "react";
import { getRequest } from "../requests/requests";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useAuth } from "../context/AuthProvider";


const Home: React.FC = () => {
  const {accessToken} = useAuth();
 
  const fetchUser = async () => {
    const response = await getRequest('/auth/auth-user/');

    console.log(response);
  }

  useEffect(() => {
    fetchUser();

  }, [accessToken]);
  


  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>This is a basic homepage.</p>

    </div>
  );
};

export default Home;
