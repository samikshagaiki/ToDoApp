import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6B46C1, #4299E1)'
      }}>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/tasks" />} />
          <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/tasks" />} />
          <Route path="/tasks" element={user ? <Tasks user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </Box>
    </Router>
  );
}