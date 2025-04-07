import './index.css'
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import { useState } from 'react';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5500/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
    } catch (error) {
      throw new Error(`Logout request failed: ${error}`);
    }
  };
  
  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  )
}

export default App
