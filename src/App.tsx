import './index.css'
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import { useState } from 'react';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  )
}

export default App
