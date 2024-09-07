import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Set initial userRole from localStorage or null
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  // Function to login as employee and persist the role
  const loginAsEmployee = () => {
    setUserRole("employee");
    localStorage.setItem("userRole", "employee");
  };

  // Function to login as manager and persist the role
  const loginAsManager = () => {
    setUserRole("manager");
    localStorage.setItem("userRole", "manager");
  };

  // Function to logout and clear the role from localStorage
  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
  };

  // Effect to persist the userRole when the app is initialized
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
