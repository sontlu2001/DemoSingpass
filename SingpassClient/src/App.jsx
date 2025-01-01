import { Route, Router, Routes } from 'react-router-dom';
import React from 'react'; 
import { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login/Login.jsx';
import Home from './pages/home/Home.jsx';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
      <ChakraProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} /> 
      <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </ChakraProvider>
    
  );
}

export default App;
