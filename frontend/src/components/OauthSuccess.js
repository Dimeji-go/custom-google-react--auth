import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const OauthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    if (accessToken) {
      // Decode the JWT access token
      const decodedToken = jwtDecode(accessToken);
      console.log("Decoded JWT:", decodedToken);
      setAuth({ accessToken });
      navigate("/"); // Redirect to a protected route after setting auth
    }
  }, [location.search, setAuth, navigate]);

  return <div>Loading...</div>;
};

export default OauthSuccess;
