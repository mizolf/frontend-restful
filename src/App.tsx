import './index.css'
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

function AppContent() {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/my-profile" 
          element={
              <ProfilePage />
          } 
        />
        <Route path="/about" element={<AboutPage/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App
