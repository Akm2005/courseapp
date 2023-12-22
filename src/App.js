// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import StudentDashboard from './components/StudentDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Newc from './components/Newc';
import CourseDetails from './components/CourseDetails';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/r" element={<Register/>} />
        <Route path="/new" element={<Newc />} />
        <Route path="/dashboard" element={<StudentDashboard/>} />
        <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
