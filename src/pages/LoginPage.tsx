import * as React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername } = useAuth();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsernameLocal] = useState<string>('');
  const [login, setLogin] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUser({ username, password });
      setPassword('');
      setErrorMessage('');
      if (data) {
        setUsername(username);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await registerUser({ email, username, password });
      setPassword('');
      setErrorMessage('');
      setLogin(true);
    } catch (error) {
      console.error("Registration failed:", error);
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
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
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
      if (!response.ok) {
        setErrorMessage(data.message || "Registration error");
        throw new Error(data.message || "Registration error");
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      throw new Error(`Registration request failed: ${error}`);
    }
  };

  return (
    <div className='flex items-center justify-center h-svh'>
      <div className='flex flex-col w-[500px] h-[500px] items-center bg-white justify-center shadow-lg rounded-xl shadow-gray-400'>
        <h2 className="text-2xl font-semibold text-center mb-6">{login ? 'Sign in' : 'Create an Account'}</h2>
        {errorMessage && 
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-4">
            <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
          </div>
        }
        {login ? (
          <LoginForm setUsername={setUsernameLocal} setPassword={setPassword} handleLoginSubmit={handleLoginSubmit} />
        ) : (
          <RegisterForm setEmail={setEmail} setUsername={setUsernameLocal} setPassword={setPassword} handleRegisterSubmit={handleRegisterSubmit} />
        )}

        <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
            {login ? "Don't have an account?" : "Already have an account?"}
            <button
                className="text-blue-600 ml-1 cursor-pointer hover:underline"
                onClick={() =>{ 
                  setErrorMessage('');
                  setLogin(!login);
                }}
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
