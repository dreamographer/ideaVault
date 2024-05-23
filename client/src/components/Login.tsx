const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Google from "/google.png";
import Github from "/github.png";

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
    const now = new Date();
    const item = {
      value: "temp",
      expiry: now.getTime() + 2 * 1000,
    };
  localStorage.setItem("jwt", JSON.stringify(item));
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
      <div className="md:mt-3  flex-col items-center flex justify-center">
        <div className="flex pt-10 w-full flex-col justify-center text-center">
          <p className="text-8xl font-extralight">IdeaVault</p>
          <p className="text-md text-slate-500 mt-5">
            Secure Your Ideas with IdeaVault!
          </p>
        </div>
        <div className="flex w-2/4 h-80  flex-col gap-4  justify-center">
          <p className="text-lg text-center font-light text-slate-900 mt-5">
            Login to Secure your Ideas...
          </p>
          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center gap-3 border rounded-xl p-5"
          >
            <img src={Google} alt="Google" className="cursor-pointer w-5 h-5" />{" "}
            <p>Continue with Google</p>
          </div>
          <div
            onClick={handleGithubSignIn}
            className="flex cursor-pointer border gap-3 p-5 items-center justify-center  rounded-xl"
          >
            <img src={Github} alt="GitHUb" className="cursor-pointer w-5 h-5" />
            <p>Continue with GitHub</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
