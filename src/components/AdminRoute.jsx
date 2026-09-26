import { Navigate, } from "react-router-dom"; 
import { getCurrentUser, } from "../auth/authStorage"; 
export default function AdminRoute({ children, })
 { const user = getCurrentUser(); if (!user) { return
   ( <Navigate to="/login" replace /> ); } if (user.role !== "admin")
     { return ( <Navigate to="/" replace /> ); }
   
 return children; }