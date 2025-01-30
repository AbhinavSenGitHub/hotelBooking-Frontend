import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectUserResponse } from './authSlice'

const ProtectedRouter = ({ children }) => {
    const isAuthenticated = useSelector(selectUserResponse)
    console.log("isAuthenticated", isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }
    
      // Render the protected route content if authenticated
      return children;
}

export default ProtectedRouter
