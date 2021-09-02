import React, { useEffect, useState, createContext } from "react";
import api from "@/services/api";
import { toast } from 'react-toastify';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>  {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@mad:user');
    const storagedToken = sessionStorage.getItem('@mad:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`
    }
  }, []);
  
  async function Login(fields) {
    try {
      console.clear();
      const response = await api.post('/auth/admin', fields);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`
      sessionStorage.setItem('@mad:user', JSON.stringify(response.data.admin));
      sessionStorage.setItem('@mad:token', response.data.token);
      setLoading(false);
      setUser(response.data.admin);
      return true; 
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Oops! Ocorreu uma falha ao processar o login.");
      return false;
    }
  }

  async function Logout() {
    try {
      await api.post("logout");
      setLoading(false);
    } catch (error) {
      console.log("logout error");
    }
    setUser(null);
    sessionStorage.removeItem('@mad:user');
    sessionStorage.removeItem('@mad:token');
    window.location.href = '/login';
  }


  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        Login,
        Logout,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
