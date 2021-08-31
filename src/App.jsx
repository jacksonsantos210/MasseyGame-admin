import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/contexts/authContext";
import Routes from './routes';

function App() {
 return (
  <AuthProvider>
    <Routes/>
    <ToastContainer />
  </AuthProvider>
  );
}

export default App;