import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './components/HomePage';
import HelpRequestList from './components/HelpRequestList';
import HelpRequestForm from './components/HelpRequestForm';
import RequestDetail from './components/RequestDetail';
import LoginPage from './components/LoginPage';
import FAQPage from './components/FAQPage';
import AboutPage from './components/AboutPage';

import { AuthProvider } from './context/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute'; 

const VolunteerCabinet = () => <div style={{ padding: '50px', textAlign: 'center' }}><h2>ЛК Волонтера: «Мои задания» и Профиль</h2></div>;
import NeederCabinet from './components/NeederCabinet'; 
const AdminPanel = () => <div style={{ padding: '50px', textAlign: 'center' }}><h2>Панель Администратора / Модератора</h2></div>;

export default function App() {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleRequestCreated = () => {
    setReloadTrigger(prev => prev + 1);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <main>
          <Routes>
            
            <Route element={<ProtectedRoute allowedRoles={['GUEST', 'VOLUNTEER', 'NEEDER', 'ADMIN']} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/requests" element={<HelpRequestList reloadTrigger={reloadTrigger} />} />
              <Route path="/requests/:id" element={<RequestDetail />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['GUEST']} />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['VOLUNTEER']} />}>
              <Route path="/volunteer/profile" element={<VolunteerCabinet />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['NEEDER']} />}>
              <Route path="/needer/my-tasks" element={<NeederCabinet />} />
              <Route 
                path="/create" 
                element={<HelpRequestForm onCreated={handleRequestCreated} />} 
              />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>

            <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '50px' }}>404 - Страница не найдена</h2>} />

          </Routes>
        </main>
        
        <Footer />
      </Router>
    </AuthProvider>
  );
}