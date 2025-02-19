import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Tasks } from './components/Tasks';
import { Navigation } from './components/Navbar';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation isAuthenticated={!!token} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/login" 
              element={token ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={token ? <Navigate to="/tasks" /> : <Register />} 
            />
            <Route 
              path="/tasks" 
              element={token ? <Tasks token={token} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={token ? "/tasks" : "/login"} />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}