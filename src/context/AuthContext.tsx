import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  email: string;
  joinedAt: string;
  setIsLoggedIn: (value: boolean) => void;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setJoinedAt: (value: string) => void;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [joinedAt, setJoinedAt] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:5500/user/profile', {
            method: 'GET',
            credentials: 'include',
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Failed to fetch profile");
          
          setUsername(data.username);
          setEmail(data.email);
          setJoinedAt(new Date(data.createdAt).toLocaleDateString());
          setIsLoggedIn(true);
    
          console.log("Profile page auth data:", { username, email, joinedAt });
        } catch (error) {
          console.error("Error loading user profile:", error);
          setIsLoggedIn(false);
        }
      };
    fetchProfile();
  }, []);
  
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5500/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
      setUsername('');
      setEmail('');
      setJoinedAt('');
      navigate('/login');
    } catch (error) {
      throw new Error(`Logout request failed: ${error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        email,
        joinedAt,
        setIsLoggedIn,
        setUsername,
        setEmail,
        setJoinedAt,
        handleLogout,
      }}
    >
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
