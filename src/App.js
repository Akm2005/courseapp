// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import StudentDashboard from './components/StudentDashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/r" element={<Register/>} />
        
        
        <Route path="/dashboard" element={<StudentDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
