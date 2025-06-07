import React, { useEffect } from 'react'
import { Routes ,Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx'
import Homepage from './pages/Homepage.jsx';
import SignupPage from './pages/SignUpPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import {Loader} from 'lucide-react';
import { useAuthStore } from './store/useAuthStore.js';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
  const {theme}=useThemeStore();

  console.log({onlineUsers});
  

  useEffect(()=>{
   checkAuth()
  },  [checkAuth]);

  console.log({authUser});
  
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar/>
       <Routes>
         <Route path="/" element={authUser? <Homepage/> : <Navigate to="/login"/>}/>
         <Route path="/signup" element={!authUser? <SignupPage/> : <Navigate to="/" />}/>
         <Route path="/login" element={!authUser? <LoginPage/> : <Navigate to="/" />}/>
         <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
         <Route path="/profile" element={authUser? <ProfilePage/> : <Navigate to="/login"/>}/>
       </Routes>

       <Toaster/>
    </div>
  );
};

export default App