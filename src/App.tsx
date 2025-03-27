import { useState } from 'react'
import './index.css'
import Header from './components/Header';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

function App() {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await loginUser({username, password});
    if(typeof data === "object" && data !== null){
      setIsLoggedIn(true);
    }
  }
  
  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await registerUser({ email, username, password });
    setLogin(true);
  }
  
  const handleLogout = async () => {
    logoutUser();
  }


  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch('http://localhost:5500/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await response.json();

      if(!response.ok) throw new Error(data.message || "Greška prilikom prijave")

      console.log(data);
      return data;
    } catch (error) {
      console.error("Greška: ", error);
      throw error;
    }
  }

  const registerUser = async (userData: RegisterCredentials) => {
    try {
      const response = await fetch('http://localhost:5500/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data: any = await response.json();

      if(!response.ok) throw new Error("Greška prilikom registracije");

      return data;
    } catch (error) {
      console.error("Greška: ", error)
      throw error;
    }
  }

  const logoutUser = async () => {
    try {
      await fetch('http://localhost:5500/user/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUsername('');
      setPassword('');
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Greška prilikom odjave:", error);
    }
  };


  if (isLoggedIn) {
    // Staviti u poseban HomePage
    return (
      <div className='flex flex-col w-full h-svh items-center justify-center'>
        <h1 className='font-bold text-2xl'>Naslovna</h1>
        <p className='text-lg'>Welcome, {username}!</p>
        <button onClick={handleLogout} className='border-none bg-blue-400 p-1.5 w-min cursor-pointer'>Logout</button>
      </div>
    );
  }

  return (
    //LOGIN FORM
    // <div className='flex flex-col w-full h-svh items-center justify-center'>
    //   <h1 className='font-bold'>Login</h1>
    //   {/* Odvojiti u 2 posebne Forme - LoginForm i RegisterForm*/}
    //   {login ? (<form className='flex flex-col items-center w-[350px] gap-2'>
    //     <input 
    //       type="text" 
    //       name="username"  
    //       className='border-[1px]'
    //       placeholder='Username'
    //       onChange={(event)=>setUsername(event.target.value)}
    //       />
    //     <input 
    //       type="password" 
    //       name="password" 
    //       placeholder='Password'
    //       onChange={(event)=>setPassword(event.target.value)}
    //       className='border-[1px]'/>
    //     <button type="submit" onClick={handleLoginSubmit} className='border-none bg-blue-400 p-1.5 w-min cursor-pointer'>Login</button>
    //   </form>) : (<form className='flex flex-col items-center w-[350px] gap-2'>
    //   <input 
    //       type="email" 
    //       name="email"  
    //       className='border-[1px]'
    //       placeholder='Email'
    //       onChange={(event)=>setEmail(event.target.value)}
    //       />
    //     <input 
    //       type="text" 
    //       name="username"  
    //       className='border-[1px]'
    //       placeholder='Username'
    //       onChange={(event)=>setUsername(event.target.value)}
    //       />
    //     <input 
    //       type="password" 
    //       name="password" 
    //       placeholder='Password'
    //       onChange={(event)=>setPassword(event.target.value)}
    //       className='border-[1px]'/>
    //     <button type="submit" onClick={handleRegisterSubmit} className='border-none bg-blue-400 p-1.5 w-min cursor-pointer'>Register</button>
    //   </form>)}
      
    //   <a href=''
    //     onClick={(event: React.MouseEvent)=>{
    //       event.preventDefault();
    //       setLogin(!login)}
    //     }>
    //       {login ? 'Don\'t have and account? Register' : 'Have and account? Login'}
    //       </a>
    // </div>

    <>
      <Header/>
    </>
  )
}

export default App
