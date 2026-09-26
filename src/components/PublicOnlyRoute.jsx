import { Navigate, } from "react-router-dom"; 
import { getCurrentUser, } from "../auth/authStorage";
 export default function PublicOnlyRoute({ children, })
  { const user = getCurrentUser(); if (!user) 
    { return children; } if (user.role === "admin")
         { return ( <Navigate to="/dashboard" replace /> ); } 
return ( <Navigate to="/" replace /> ); }