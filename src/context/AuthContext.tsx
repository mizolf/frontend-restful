import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  setIsLoggedIn: (value: boolean) => void;
  setUsername: (value: string) => void;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5500/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
      setUsername('');
      navigate('/login');
    } catch (error) {
      throw new Error(`Logout request failed: ${error}`);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, setUsername, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 