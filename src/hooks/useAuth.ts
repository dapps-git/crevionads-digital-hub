import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('crevionads_admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const login = (adminData: any) => {
    localStorage.setItem('crevionads_admin', JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('crevionads_admin');
    setAdmin(null);
  };

  return { admin, login, logout, isAuthenticated: !!admin };
};
