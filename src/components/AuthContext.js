import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  const loginAsEmployee = () => {
    setUserRole("employee");
    localStorage.setItem("userRole", "employee");
  };

  const loginAsManager = () => {
    setUserRole("manager");
    localStorage.setItem("userRole", "manager");
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userRole, loginAsEmployee, loginAsManager, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
