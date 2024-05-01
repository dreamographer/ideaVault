import React from "react";
import { Navigate,Outlet} from "react-router-dom";
import { useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ProtectedRoute: React.FC= () => {
    useEffect(() => {
      async function getAuth() {
        const itemStr = localStorage.getItem("jwt");
        if (itemStr) {
          const item = JSON.parse(itemStr);
          const now = new Date();
          console.log(now.getTime() , item.expiry);
          
          if (now.getTime() > item.expiry) {
            localStorage.removeItem("jwt");
          }
          if (item.value.length > 5) {
            return;
          }
        }
        const res = await fetch(`${BASE_URL}/auth/genToken`, {
          credentials: "include",
        });
        const token = await res.json();
        const now = new Date();
        const item = {
          value: token.accessToken,
          expiry: now.getTime() + 10 * 1000,
        };
        if (token) localStorage.setItem("jwt", JSON.stringify(item));
      }
      getAuth();
    }, []);
  const isAuthenticated = localStorage.getItem("jwt"); 
return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
