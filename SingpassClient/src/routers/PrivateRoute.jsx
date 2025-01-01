import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = (props) => {
  const isAuthenticated = sessionStorage.getItem('jwt');
  
  if (!isAuthenticated) {
   return <Navigate to="/login" />
  }
    return <>{props.children}</>
};

export default PrivateRouter;
