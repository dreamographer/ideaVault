const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Google from "/google.png";

const handleGoogleSignIn = async () => {
  const now = new Date();
  const item = {
    value: "temp",
    expiry: now.getTime() + 2 * 1000,
  };
  localStorage.setItem("jwt", JSON.stringify(item));
  window.open(`${BASE_URL}/auth/google/callback`, "_self");
};
const handleGithubSignIn = async () => {
  localStorage.setItem("jwt", "TEMP");
  window.open(`${BASE_URL}/auth/github/callback`, "_self");
};
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, localStorage.getItem("jwt")]);
  return (
    <>
      <div className="md:mt-3 ">
        <p>Or continue with</p>
        <div className="flex gap-4 mt-3 justify-center">
          <img
            onClick={handleGoogleSignIn}
            src={Google}
            alt="Google"
            className="cursor-pointer w-9 h-9"
          />
          {/* <img
            onClick={handleGithubSignIn}
            src={Github}
            alt="GitHUb"
            className="cursor-pointer w-9 h-9"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Login;
