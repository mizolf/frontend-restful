import * as React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useState } from 'react';
import HomePage from './HomePage';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

interface LoginPageProps{
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean)=>void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isLoggedIn, setIsLoggedIn }: LoginPageProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [login, setLogin] = useState<boolean>(true);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUser({ username, password });
      if (data) setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await registerUser({ email, username, password });
      setLogin(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch('http://localhost:5500/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login error");

      return data;
    } catch (error) {
      throw new Error(`Login request failed: ${error}`);
    }
  };

  const registerUser = async (userData: RegisterCredentials) => {
    try {
      const response = await fetch('http://localhost:5500/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration error");

      return data;
    } catch (error) {
      throw new Error(`Registration request failed: ${error}`);
    }
  };

  const logoutUser = async () => {
    try {
      await fetch('http://localhost:5500/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUsername('');
      setPassword('');
      setIsLoggedIn(false);
    } catch (error) {
      throw new Error(`Logout request failed: ${error}`);
    }
  };

  if (isLoggedIn) {
    return (
      <HomePage username={username}/>
    );
  }

  return (
    <div className='flex items-center justify-center h-svh'>
      <div className='flex flex-col w-[500px] h-[500px] items-center bg-white justify-center shadow-lg rounded-xl shadow-gray-400'>
        <h2 className="text-2xl font-semibold text-center mb-6">{login ? 'Sign in' : 'Create an Account'}</h2>
        {login ? (
          <LoginForm setUsername={setUsername} setPassword={setPassword} handleLoginSubmit={handleLoginSubmit} />
        ) : (
          <RegisterForm setEmail={setEmail} setUsername={setUsername} setPassword={setPassword} handleRegisterSubmit={handleRegisterSubmit} />
        )}

        <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
            {login ? "Don't have an account?" : "Already have an account?"}
            <button
                className="text-blue-600 ml-1 cursor-pointer hover:underline"
                onClick={() => setLogin(!login)}
            >
                {login ? 'Create new account' : 'Sign in'}
            </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
